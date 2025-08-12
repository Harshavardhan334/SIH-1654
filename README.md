# Interview Management System

A full-stack web application for managing interviews with role-based access control for admins, experts, and candidates.

## 🚀 Features

- **Multi-role Authentication**: Admin, Expert, and Candidate roles with different permissions
- **Interview Management**: Schedule and manage interviews between candidates and experts
- **Candidate Matching**: Intelligent matching system for pairing candidates with experts
- **Real-time Updates**: Live interview status updates and notifications
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Secure API**: JWT-based authentication with role-based authorization

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests
- **dotenv** for environment variables

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

## 📁 Project Structure

```
sih1/
├── backend/
│   ├── config/
│   │   └── config.env          # Environment variables
│   ├── controllers/            # Route handlers
│   ├── Database/
│   │   └── dbConnection.js     # MongoDB connection
│   ├── Middlewares/            # Authentication & error handling
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   ├── app.js                  # Express app setup
│   └── server.js               # Server entry point
└── frontend/
    └── react-app/
        ├── src/
        │   ├── components/     # Reusable components
        │   ├── pages/          # Page components
        │   ├── context/        # React context
        │   ├── utils/          # Utility functions
        │   └── App.jsx         # Main app component
        └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sih1
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend/react-app
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend/config/` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the development servers**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend/react-app
   npm run dev
   ```

## 📱 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 User Roles

### Admin
- Manage all users (candidates and experts)
- View all interviews
- Assign interviews
- System-wide analytics

### Expert
- View assigned interviews
- Conduct interviews
- Update interview status
- Provide feedback

### Candidate
- View assigned interviews
- Participate in interviews
- Update profile information
- View interview history

## 🌐 API Endpoints

### Authentication
- `POST /` - Login
- `POST /register` - Register new user
- `GET /logout` - Logout

### Admin Routes (`/admin`)
- `GET /users` - Get all users
- `POST /user/new` - Create new user
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Expert Routes (`/expert`)
- `GET /interviews` - Get expert's interviews
- `PUT /interview/:id` - Update interview status

### Candidate Routes (`/candidate`)
- `GET /profile` - Get candidate profile
- `PUT /profile` - Update candidate profile
- `GET /interviews` - Get candidate's interviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Harshavardhan**

## 📞 Support

For support, email or create an issue in the repository.
