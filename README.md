# BlogAPI

A RESTful API for a blogging platform built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- User profile management
- Blog post creation and management
- Role-based access control (Admin and User roles)
- Input validation and error handling
- Secure password storage with bcrypt

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## Project Structure

```
BlogAPI/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── .env            # Environment variables
├── .gitignore      # Git ignore file
├── package.json    # Project dependencies
├── README.md       # Project documentation
└── server.js       # Entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. The API will be available at `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register a new user

```
POST /api/auth/register
```

Request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login

```
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### User Endpoints

**All user endpoints require authentication.**

#### Get user profile

```
GET /api/users/profile
```

Headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update user profile

```
PUT /api/users/profile
```

Headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Request body (all fields optional):

```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "bio": "This is my bio"
}
```

#### Get all users (Admin only)

```
GET /api/users
```

Headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Delete user (Admin only)

```
DELETE /api/users/:id
```

Headers:

```
Authorization: Bearer
```
