# NestJS Server 

## Description
This repository contains a server-side application built using **NestJS**, designed for scalability, efficiency, and security. The project integrates a modern tech stack to provide robust features, including user management, multilevel comment handling, and thread-based discussions.

## Features  
- **User Authentication & Authorization** Implements JWT-based authentication using `@nestjs/jwt` and `passport-jwt`.
- **Role-based Access Control**: Ensures protected resources are accessed only by authorized users.
- **Database Integration**
  - PostgreSQL Leveraged with TypeORM for relational data management.
  - Dual implementation of database queries:  
    1. **Raw SQL** TypeORM Query Builder. 
    2. **ORM-based Implementation** using TypeORM’s repository and entity manager.  
- **Validation and Transformation** Input validation using `class-validator`.

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

## Tech Stack
- **NestJS**: Provides the modular structure for scalable server-side development.
- **PostgreSQL**: The relational database system, supported by TypeORM for ORM and raw SQL capabilities.
- **Passport & JWT**: Handles authentication and session management.
- **TypeScript**: Strongly typed language for maintainable code.
- **class-validator**: Validates incoming requests to ensure data consistency.

P.s. Before you start the development - **Create a .env file based on the provided .env.example**

Dive into the code, explore the features, and start building your own server using NestJS anf PostgreSQL today.

Happy coding! :)