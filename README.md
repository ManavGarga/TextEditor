# 📝 Real-Time Collaborative Document Editor

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styled-38B2AC?logo=tailwind-css)
![Liveblocks](https://img.shields.io/badge/Liveblocks-Realtime-purple)
![Convex](https://img.shields.io/badge/Convex-Realtime_Backend-orange)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active_Development-success)

---

## 🚀 Overview

A modern real-time collaborative document editor that enables multiple users to write, edit, and comment together seamlessly.

Built with **Next.js**, **Liveblocks**, **Convex**, **Clerk**, and **Tiptap**, this project delivers a Google Docs–like collaboration experience with a fully customizable and modern UI.

---

## ✨ Features

- ✍️ Rich text editing using **Tiptap**
- 👥 Real-time collaboration with live cursors and presence
- 💬 Inline comments and threads
- 🧑‍🤝‍🧑 Organization-based document access
- 🔐 Secure authentication and authorization (Clerk)
- ⚡ Realtime backend and sync (Convex)
- 📏 Custom page margins and ruler
- 🖨️ Print-friendly layout
- 🎨 Custom UI (not a Google Docs clone)

---

## 🧱 Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Tiptap Editor
- Liveblocks React

### Backend
- Convex (Realtime database & functions)
- Liveblocks Node SDK

### Authentication
- Clerk (Users & Organizations)


---

## 🔐 Authentication & Authorization

- Users authenticate via **Clerk**
- Each document is protected by access rules
- A user can access a document if:
  - They are the document owner, or
  - They belong to the organization that owns the document
- Liveblocks sessions are securely authorized via `/api/liveblocks-auth`

---

## 🔄 Real-Time Collaboration

- **Liveblocks** handles:
  - Presence
  - Cursor tracking
  - Shared editor state
  - Comments and threads
- **Convex** ensures:
  - Fast document fetching
  - Secure token-based access
  - Realtime data consistency

---

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory:
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

LIVEBLOCKS_SECRET_KEY=


---

## ▶️ Running Locally

- npm install
- npx convex dev
- npm run dev


Open **http://localhost:3000** in your browser.

---

## 🎨 UI Customization

The UI is intentionally designed to be easily customizable without changing backend logic.

You can add:
- Dark mode and themes
- Focus (Zen) mode
- Slash commands
- Floating formatting toolbar
- Command palette
- Page width presets
- Export options (PDF / Markdown)

---

## 📌 Project Status

- Backend: ✅ Stable  
- Realtime collaboration: ✅ Working  
- Authentication: ✅ Secure  
- UI: 🛠 Customizable  

---

## 🤝 Contributing

Contributions are welcome.  
Feel free to fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

