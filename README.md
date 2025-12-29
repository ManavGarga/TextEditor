# TextEditor

📝 Real-Time Collaborative Document Editor
<p align="center"> <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" /> <img src="https://img.shields.io/badge/React-19-blue?logo=react" /> <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" /> <img src="https://img.shields.io/badge/Tailwind_CSS-Styled-38B2AC?logo=tailwind-css" /> </p> <p align="center"> <img src="https://img.shields.io/badge/Liveblocks-Realtime-purple" /> <img src="https://img.shields.io/badge/Convex-Realtime_Backend-orange" /> <img src="https://img.shields.io/badge/Clerk-Authentication-6C47FF" /> </p> <p align="center"> <img src="https://img.shields.io/badge/License-MIT-green" /> <img src="https://img.shields.io/badge/Status-Active_Development-success" /> </p>
🚀 Overview

A modern real-time collaborative document editor that enables multiple users to write, edit, and comment together seamlessly.
Built with Next.js, Liveblocks, Convex, Clerk, and Tiptap, this project delivers a Google Docs–like collaboration experience with a fully customizable and modern UI.

✨ Features

✍️ Rich Text Editing using Tiptap

👥 Real-time Collaboration with live cursors and presence

💬 Inline Comments & Threads

🧑‍🤝‍🧑 Organization-based Document Access

🔐 Secure Authentication & Authorization (Clerk)

⚡ Realtime Backend & Data Sync (Convex)

📏 Custom Page Margins & Ruler

🖨️ Print-friendly Layout

🎨 Custom UI (Not a Google Docs clone)

🧱 Tech Stack
Frontend

Next.js 15 (App Router)

React 19

TypeScript

Tailwind CSS

Tiptap Editor

Liveblocks React

Backend

Convex (Realtime database & functions)

Liveblocks Node SDK

Authentication

Clerk (Users & Organizations)

📂 Project Structure
src/
├── app/
│   ├── api/liveblocks-auth/route.ts
│   ├── documents/[documentId]/
│   │   ├── page.tsx
│   │   ├── room.tsx
│   │   ├── editor.tsx
│   │   ├── toolbar.tsx
│   │   ├── navbar.tsx
│   │   └── threads.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
├── hooks/
├── store/
├── extensions/
└── constants/

🔐 Authentication & Authorization

Users authenticate via Clerk

Each document is protected by access rules

A user can access a document if:

They are the document owner, or

They belong to the organization that owns the document

Liveblocks sessions are securely authorized via /api/liveblocks-auth

🔄 Real-Time Collaboration

Liveblocks powers:

Presence

Cursor tracking

Shared editor state

Comments and threads

Convex ensures:

Fast server-side document fetching

Secure token-based access

Realtime data consistency

🛠️ Environment Variables

Create a .env.local file in the root directory:

# Convex
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Liveblocks
LIVEBLOCKS_SECRET_KEY=

▶️ Running Locally
# Install dependencies
npm install

# Start Convex development server
npx convex dev

# Run Next.js app
npm run dev


Open http://localhost:3000
 in your browser.

🎨 UI Customization

The UI is intentionally designed to be easily customizable without touching backend logic.

You can add:

Dark mode / themes

Focus (Zen) mode

Slash commands

Floating formatting toolbar

Command palette

Page width presets

Export options (PDF / Markdown)

📌 Project Status

✅ Backend stable

✅ Real-time collaboration working

✅ Secure authentication

🛠 UI actively customizable

🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

📜 License

This project is licensed under the MIT License.