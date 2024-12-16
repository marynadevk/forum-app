# Flower Forum

## Project Description
This project is a full-stack application with a frontend built using **React, Vite, and ShadCN**, and a backend powered by two interchangeable server options: one built with **Express.js and MongoDB**, and the other with **NestJS and PostgreSQL**. This flexible setup ensures scalability and adaptability for varying deployment needs. The forum is designed for gardening enthusiasts, enabling seamless discussions about flowers, plants, and all things related to gardening.

The Flower Forum allows users to sign up, log in, and manage their profiles. Users can view other profiles along with their threads and posts, create or participate in discussions, and interact with content through likes and comments.

## Frontend
### Tech Stack
- **React**: Core library for building the user interface.
- **ShadCN**: UI components built on Radix UI and styled with TailwindCSS.
- **TailwindCSS**: Utility-first CSS framework for rapid styling.
- **Zustand**: Lightweight state management.
- **Axios**: For making HTTP requests to the backend.
- **Cloudinary**: Handles image upload and management.
- **React Hook Form & Zod**: Form handling and schema-based validation.
- **React Toastify**: Toast notifications for user feedback.
- **Emoji Picker**: Adds emoji support to text fields.
- **TypeScript**: Ensures type safety and maintainable code.


## Backend Compatibility
This frontend is designed to work seamlessly with the backend server built using ``Express.js + MongoDB`` or ``NestJS + PostgreSQL``.

✅ **Ensure the backend server is configured and running before testing the full application.**

---

## Backend Options:

### Express.js + MongoDB  
This option provides a minimalist, NoSQL-based backend for fast development and dynamic data storage.  

#### Core Features  
- **User Authentication**: Secure login using JSON Web Tokens (JWT).  
- **Thread and Post Management**: Full CRUD operations for threads and posts.  
- **Commenting System**: Nested comments with multilevel replies.  
- **Like/Unlike System**: Users can like/unlike posts and comments, with real-time count updates.  
- **Notification System**:  
  - Receive notifications when someone likes your post or replies to your comment.  
  - Notifications include details about the initiator and can be marked as read.  

#### Tech Stack  
- **Express.js**: Lightweight and flexible web framework for REST APIs.  
- **MongoDB**: NoSQL database for scalable and efficient data storage.  
- **Mongoose**: ODM library for schema-based solutions.  
- **JWT**: Secure authentication and session handling.  
- **TypeScript**: Adds maintainability with strong typing.

---

### NestJS + PostgreSQL  
This option offers a structured, relational backend suited for enterprise-grade applications.  

#### Core Features  
- **User Authentication**: Implemented with `@nestjs/jwt` and `passport-jwt`.  
- **Thread and Post Management**: Full CRUD functionality with relational mapping.  
- **Commenting System**: Multilevel nested comments with editing and deletion support.   

#### Tech Stack  
- **NestJS**: Modular framework for building scalable server-side applications.  
- **PostgreSQL**: Relational database for structured data.  
- **TypeORM**: Database abstraction with support for raw SQL queries and ORM.  
- **Passport**: Authentication middleware for managing user sessions.  
- **TypeScript**: Maintains type safety across the codebase.

---

## Getting Started

1. Clone the repository:
  ```bash
  git clone https://github.com/marynadevk/forum-app.git
  ```
2. Install dependencies for server and client projects, run:

```bash
cd frontend/
npm ci

cd express-backend/
npm ci
  or 
cd nest-backend/
npm ci
```

3. Create a .env files based on the provided .env.example

4. To start the development servers, run:

```bash
*frontend*
npm run dev

*express-backend*
npm run dev

*nest-backend*
npm run start:dev
```

Dive into the project, explore its capabilities, and start building your own Forum.

Happy Coding! 🌼