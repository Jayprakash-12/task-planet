# Task Planet - Mini Social Post Application

## Overview
A full-stack Mini Social Post Application built for the 3W Full Stack Internship Assignment. It closely mirrors the aesthetic of the TaskPlanet mobile app with a clean, fully responsive, glassmorphic Material UI design.

## Features Included
1. **User Authentication**: Secure Sign Up and Log In with JWT and bcrypt password hashing.
2. **Create Post**: Users can post content, image URLs, or both.
3. **Public Feed**: A globally synced feed showcasing all posts, timestamps, users, likes, and comments.
4. **Interactive Engagement**: Real-time Like and Comment updates mapped natively with MongoDB schemas.

## Tech Stack
- **Frontend**: React.js, Vite, Material UI (MUI), Context API
- **Backend**: Node.js, Express, JSONWebToken, bcryptjs
- **Database**: MongoDB (Mongoose)

## Run Locally
**1. Start the Backend:**
```bash
cd backend
npm install
npm run dev
```

**2. Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`.
