# WellnessPlatform
# 🚀 Secure Wellness Session Platform

A full-stack web application for managing wellness sessions (like yoga, meditation, etc.) with secure user authentication, draft creation, auto-save functionality, and session publishing.

This project was built as part of the **Arvyax Full Stack Internship Assignment**.

---

## 📌 Features

- 🔐 User Registration & Login with JWT
- ✍️ Create custom wellness session drafts
- 💾 Auto-save drafts every second as the user types
- 📤 Publish sessions
- 📚 View all published sessions
- 🎯 Protected routes using JWT middleware

---

## 💻 Tech Stack

### Frontend:
- HTML
- CSS
- JavaScript (Vanilla)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcrypt for password hashing

### Deployment (Optional):
- Frontend: Netlify / Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## 📂 Folder Structure
project-root/
├── frontend/
│ ├── index.html # Login/Register UI
│ ├── dashboard.html # Draft & Publish UI
│ ├── style.css # Styling
│ └── script.js # Frontend logic
└── backend/
├── models/
│ ├── User.js # Mongoose user schema
│ └── Session.js # Mongoose session schema
├── routes/
│ ├── auth.js # Auth API routes
│ └── sessions.js # Session-related routes
├── middleware/
│ └── auth.js # JWT middleware
├── server.js # Entry point
└── .env # Environment config
