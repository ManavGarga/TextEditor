import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  console.log("LIVEBLOCKS AUTH HIT");

  // 1️⃣ Clerk authentication
  const { sessionClaims } = await auth();
  if (!sessionClaims) return json(401, { error: "No session" });

  const user = await currentUser();
  if (!user) return json(401, { error: "No user" });

  // 2️⃣ Get room id from Liveblocks header
  const room = req.headers.get("x-liveblocks-room-id");
  if (!room) return json(400, { error: "Missing room id" });

  // 3️⃣ Fetch document from Convex
  const document = await convex.query(api.documents.getById, {
    id: room as Id<"documents">,
  });

  if (!document) {
    return json(401, { error: "Document not found" });
  }

  // 4️⃣ Owner check
  const isOwner = document.ownerId === user.id;

  // 5️⃣ ORG MEMBERSHIP CHECK (✅ THIS IS THE KEY FIX)
  let isOrgMember = false;

  if (document.organizationId) {
    const clerk = await clerkClient();

    const memberships =
      await clerk.organizations.getOrganizationMembershipList({
        organizationId: document.organizationId,
      });


    isOrgMember = memberships.data.some(
      (membership) =>
        membership.publicUserData?.userId === user.id
    );
  }

  // 6️⃣ Authorization decision
  if (!isOwner && !isOrgMember) {
    return json(401, { error: "Not allowed" });
  }

  // 7️⃣ Liveblocks session
  const name =
    user.fullName ??
    user.primaryEmailAddress?.emailAddress ??
    "Anonymous";

  const hue =
    Math.abs(
      name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    ) % 360;

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color: `hsl(${hue}, 80%, 60%)`,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
