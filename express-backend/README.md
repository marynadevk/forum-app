# Express Server 

## Description
This repository contains a server-side application built using **ExpressJS**, designed for scalability, efficiency, and security. The project integrates a modern tech stack to provide robust features, including user management, multilevel comment handling, and thread-based discussions.

## Features  
- **User Authentication & Authorization** Implements JWT-based authentication using `jsonwebtoken` and middleware for protected routes.
- **Role-based Access Control**: Ensures protected resources are accessed only to authorized users.
- **Database Integration**
  - MongoDB: Managed with Mongoose for schema definition, data modeling, and database operations.

## Core Features
- **User Management**
  - Registration, login, profile update, and account deletion.
  - Retrieve user profiles and their associated posts.
- **Thread/Posts**
  - CRUD operations for threads/posts.
  - View all posts or posts by a specific author
- **Multilevel Commenting System**
  - Support for nested comments and sub comments.
  - CRUD operations on comments.
- **Like/Unlike System**
  - Users can like or unlike posts and comments.
  - Likes are counted dynamically and associated with the user who performed the action.
- **LNotification System**
  - Notifications for the following events
    - A user likes a post or comment;
    - A user comments on a post;
  - Notifications include details about the initiator (user who performed the action).
  - Users can view and mark notifications as read.


## Tech Stack
- **ExpressJS**: Minimalist and flexible web framework for building RESTful APIs..
- **MongoDB**: NoSQL database used for efficient and scalable data storage.
- **Mongoose**: ODM for MongoDB, providing schema-based solutions for application data.
- **JWT**: JSON Web Token for secure authentication and session management.
- **TypeScript**: Adds type safety and improves maintainability of the codebase.

P.s. Before you start the development - **Create a .env file based on the provided .env.example**

Dive into the project, explore its capabilities, and start building your own server using ExpressJS and MongoDB today.

Happy coding! :)