# Devdex

A structured project showcase platform where developers and designers present work using the PSAT (Problem–Solution–Approach–Technologies) framework.

---

## Problem Statement

Most portfolio platforms focus on *what* was built rather than *why* and *how*. This makes it difficult for recruiters, collaborators, and learners to evaluate real problem-solving ability.

---

## Solution

This platform introduces a standardized PSAT format that structures project presentation into:
- Problem
- Solution
- Approach
- Technologies

This makes projects easier to understand, evaluate, and compare across users.

---

## App Features

- Structured project posts (PSAT format)
- User authentication and profile management
- CRUD operations for project posts
- Tagging by technologies and domain
- Secure REST API with JWT-based authentication

---

## 

## System Design Overview

### Architecture
- RESTful API using Express
- Server side validation using Zod
- MongoDB for data persistence
- JWT-based authentication
- Modular MVC architecture

### Data Flow
Client → Routes → Validators → Controllers → Services → Repositories → Database

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Other Tools:** dotenv, cookie-parser, cors , Zod

---

## Folder Structure
```
project-root/
│── controllers/
│── models/
│── routes/
│── middleware/
│── repositories/
│── utils/
│── services/
│── config/
│── validators/
│── app.js

````
---

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/sonivaibhav-git/Devdex.git
```
2. Navigate to project directory
```bash
cd Devdex
```
3. Install dependencies
```bash
npm install
```
4. Create a .env file in the root directory
```bash
PORT=3000 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
5. Run the server
```bash
npm start
```

---
## License

This project is proprietary and not open for public use, modification, or distribution.