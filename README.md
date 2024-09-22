# Postman Collection Link
https://www.postman.com/altimetry-administrator-64942417/andes-backend/collection/negcjby/andes-backend?action=share&creator=33444157

# Andes Backend Developer Internship Challenge

## Challenge Overview-to be Completed by 23rd September, 11:30 AM

Welcome to the Andes Backend Developer Internship Challenge! This assignment is designed to evaluate your backend development skills, understanding of RESTful API principles, and your ability to use Git for version control. You will build a simple RESTful API that manages users and tasks.

## Objectives

- Develop a RESTful API with basic CRUD (Create, Read, Update, Delete) operations.
- Utilize MongoDB for data storage and Mongoose for managing schemas and models.
- Demonstrate your understanding of Git by managing your project’s source code.

## Challenge Requirements

### Technology Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

### API Features

You will implement two main models: **Users** and **Tasks**.

#### User Model

- **Fields:**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, hashed)
  - `createdAt` (timestamp, auto-generated)

#### Task Model

- **Fields:**
  - `title` (string, required)
  - `description` (string)
  - `completed` (boolean, default: false)
  - `assignedTo` (reference to User)
  - `dueDate` (timestamp, optional)

### API Endpoints

You will create the following endpoints for both models:

#### Users

- `POST /users` - Create a new user.
- `GET /users` - Fetch all users.
- `GET /users/:id` - Fetch a single user by ID.
- `PUT /users/:id` - Update user information.
- `DELETE /users/:id` - Delete a user.

#### Tasks

- `POST /tasks` - Create a new task.
- `GET /tasks` - Fetch all tasks.
- `GET /tasks/:id` - Fetch a single task by ID.
- `PUT /tasks/:id` - Update task information.
- `DELETE /tasks/:id` - Delete a task.

### Additional Requirements

- Ensure data validation (required fields, unique email).
- Provide proper error handling with appropriate HTTP status codes.

## Git Workflow

- Initialize a Git repository for your project.
- Use meaningful commit messages while pushing your code.
- The final code should be pushed to GitHub or another Git platform.

## Submission Instructions

1. Fork this repository and clone it to your local machine.
2. Complete the challenge as per the requirements listed above.
3. Push your code to your GitHub repository.
4. Submit the link to your GitHub repository along with a Postman collection for the API endpoints you implemented.

## Conclusion

This challenge is an opportunity for you to showcase your backend development capabilities. We look forward to reviewing your submission!

If you have any questions during the challenge, feel free to reach out.

email:- andesnow1604@gmail.com ; yashtekavade@gmail.com
