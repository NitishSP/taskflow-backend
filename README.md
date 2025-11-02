# TaskFlow Backend API

A RESTful API for task management built with Node.js, Express, and MongoDB.

## � Features

- User authentication (register, login, logout) with JWT
- Refresh token mechanism for secure session management
- Complete CRUD operations for tasks
- Task status tracking (todo, in-progress, done)
- Priority levels (low, medium, high)
- User-specific task management

## 🛠️ Tech Stack

- **Node.js** & **Express.js** - Backend framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/NitishSP/taskflow-backend.git
cd taskflow-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskflowDatabase
PORT=3000
CLIENT_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_super_secret_access_key_change_this_in_production
JWT_ACCESS_EXPIRE=15m

JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_REFRESH_EXPIRE=30d

NODE_ENV=development
```

4. **Start MongoDB**
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

5. **Run the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:3000`

## 📖 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| POST | `/api/v1/auth/refresh` | Refresh access token | Public |
| POST | `/api/v1/auth/logout` | Logout user | Public |
| GET | `/api/v1/auth/profile` | Get user profile | Private |

### Tasks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/tasks` | Create new task | Private |
| GET | `/api/v1/tasks` | Get all user tasks | Private |
| GET | `/api/v1/tasks/:id` | Get task by ID | Private |
| PUT | `/api/v1/tasks/:id` | Update task | Private |
| DELETE | `/api/v1/tasks/:id` | Delete task | Private |

**Note**: Private routes require `Authorization: Bearer <accessToken>` header.

## 📝 API Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Create Task
```bash
POST /api/v1/tasks
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "todo",
  "priority": "high",
  "dueDate": "2025-11-15T23:59:59.000Z"
}
```

## 🏗️ Project Structure

```
taskflow-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## 🔒 Security

- Password hashing with bcrypt
- JWT-based authentication with access and refresh tokens
- HttpOnly cookies for refresh tokens
- CORS protection
- Input validation and sanitization

## 📬 Testing

Import the Postman collection from the `postman/` directory for easy API testing.

## ‍💻 Author

**Nitish Singh**
- GitHub: [@NitishSP](https://github.com/NitishSP)

## � License

ISC License
