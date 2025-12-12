#  Social Media Web App

A full-stack social media platform built with the MERN stack and REST API architecture, enabling users to share posts, interact with content, and connect with others.

---

##  Technologies Used

### Frontend
- React.js
- Material-UI
- CSS
- React Router DOM
- Redux

### Backend
- Node.js
- Express.js
- MongoDB
- REST API
- JWT Authentication

---

##  Key Features

 User registration and authentication

 Secure login system with JWT tokens

 Create and share posts with text captions

 Like and unlike posts

 Discover suggested users

 Follow and unfollow users

 View follower and following counts

 Browse posts from followed users

 Interact with posts in your feed

 Update and edit user profile information

---

##  Prerequisites

Before running this application, ensure you have:

• Node.js installed
• MongoDB (local) or MongoDB Atlas account
• VS Code or any code editor

---

##  Installation & Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
```

### Step 2: Set up the Frontend
```bash
cd client
npm install
npm start
```

### Step 3: Set up the Backend
```bash
cd server
npm install
nodemon
```

### Step 4: Configure MongoDB
Ensure MongoDB is running locally or set up MongoDB Atlas connection string in environment variables

---

##  Running the Application

**Frontend:** http://localhost:3000

**Backend:** http://localhost:4000

> Make sure both servers are running simultaneously for full functionality

---

##  Application Flow

1. Register/Sign up as a new user
2. Login with your credentials
3. Create and share posts
4. Explore suggested users
5. Follow users and build your network
6. Like and interact with posts
7. Update your profile anytime

---

##  Project Structure

```
project-root/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── server/          # Node.js backend
    ├── models/
    ├── routes/
    ├── controllers/
    └── package.json
```

---

##  Security Features

- JWT-based authentication
- Password encryption
- Protected routes
- Secure API endpoints

---

##  Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

---

##  License

This project is open source and available for educational purposes.

---

**Built with ❤️ using MERN Stack**

