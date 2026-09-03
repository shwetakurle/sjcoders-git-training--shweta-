# sjcoders-git-training--shweta-

Git & GitHub fundamentals training repository for SJ Coders Software internship, covering Git commands, branching, commits, push/pull, Pull Requests, Spring Boot, React, API integration, security, and validation.

## Day 3 - Employee Management System

### Overview

Developed an Employee Management System backend using Spring Boot and MySQL.

### Features

- Add employee
- View all employees
- View employee by ID
- Search employees by name or department
- Update employee
- Delete employee
- Employee data validation
- MySQL database integration

### Architecture

The application follows a layered architecture:

- Controller Layer - Handles HTTP requests
- Service Layer - Contains business logic
- Repository Layer - Communicates with the database
- Model Layer - Represents employee data
- MySQL Database - Stores employee records

### Employee API Endpoints

- POST `/api/employees` - Add employee
- GET `/api/employees` - View all employees
- GET `/api/employees/{id}` - View employee by ID
- GET `/api/employees/search?query=` - Search employees
- PUT `/api/employees/{id}` - Update employee
- DELETE `/api/employees/{id}` - Delete employee

### Database

MySQL is used to store employee information.

Database name:

`sjcoders_training`

### Backend Run Steps

Go to:

`day-03-employee-management/backend/training`

Run:

`.\mvnw.cmd spring-boot:run`

Backend runs on:

`http://localhost:8080`


## Day 4 - React Frontend and API Integration

### Overview

Developed a React frontend for the Employee Management System and connected it with the Spring Boot REST APIs.

### Features

- Bootstrap Employee Form
- Add employee from frontend
- Display employee list
- Search employees
- Connect React frontend with Spring Boot backend
- Fetch employee data using REST APIs

### Technologies Used

- React
- JavaScript
- Bootstrap
- HTML
- CSS
- Fetch API
- Spring Boot REST API


## Day 5 - Security, Validation and RBAC

### Overview

Enhanced the Employee Management System with Spring Security, JWT authentication, role-based access control, validation, and exception handling.

### Security Features

- Spring Security integration
- JWT-based authentication
- BCrypt password encryption
- User registration and login
- ADMIN and USER role-based access control

### Role Permissions

ADMIN

- Add employees
- View employees
- Search employees
- Edit employees
- Delete employees

USER

- View employees
- Search employees
- Cannot add employees
- Cannot edit employees
- Cannot delete employees

### Validation

Employee data is validated using Jakarta Validation.

- Employee code is required
- Full name is required
- Valid email address is required
- Phone number is required
- Department is required
- Role is required
- Status is required

### Error Handling

Global exception handling is implemented to return clear validation error messages with HTTP 400 Bad Request.

### Authentication Endpoints

- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login and generate JWT token

### Secured Employee API Endpoints

- POST `/api/employees` - ADMIN only
- GET `/api/employees` - ADMIN and USER
- GET `/api/employees/{id}` - ADMIN and USER
- GET `/api/employees/search?query=` - ADMIN and USER
- PUT `/api/employees/{id}` - ADMIN only
- DELETE `/api/employees/{id}` - ADMIN only

### JWT Authorization

Protected API requests use a JWT token in the Authorization header:

`Authorization: Bearer <token>`

### Day 5 Testing

- ADMIN GET - 200 OK
- ADMIN POST - 201 Created
- ADMIN PUT - 200 OK
- ADMIN DELETE - 204 No Content
- USER GET - 200 OK
- USER Search - 200 OK
- USER POST - 403 Forbidden
- USER PUT - 403 Forbidden
- USER DELETE - 403 Forbidden
- Invalid employee data - 400 Bad Request

### Technologies Used

- Java 17
- Spring Boot
- Spring Security
- JWT
- BCrypt
- Spring Data JPA
- Jakarta Validation
- MySQL
- Maven
- React
- Bootstrap
- Postman