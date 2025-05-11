# Vaccination Management System

## Overview

The Vaccination Management System is a web application designed to manage vaccination drives, student registrations, and user authentication. It provides functionalities for creating and managing vaccination drives, registering and managing students, and handling user authentication and authorization.

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Vaccination Drive Management**: Create, update, and fetch vaccination drives and their statistics.
- **Student Management**: Register students, update student information, and manage student participation in vaccination drives.
- **Statistics**: View statistics related to vaccination drives and student participation.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Data Parsing**: CSV and XLSX file handling
- **Logging**: Console logging for debugging

## Project Structure

- **src/controllers**: Contains the logic for handling requests and responses.
- **src/routes**: Defines the API endpoints and routes.
- **src/services**: Contains business logic and interactions with the database.
- **src/schemas**: Defines the MongoDB schemas for the application.
- **src/interfaces**: TypeScript interfaces for data types used across the application.
- **src/middlewares**: Middleware functions for authentication and file uploads.
- **src/config**: Configuration files for database and server settings.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kislayvats/vaccination-management-system.git
   cd vaccination-management-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
   APP_MODE=api
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Login an existing user.
- **GET** `/auth/current-user`: Get the current logged-in user.

### Vaccination Drives

- **POST** `/vaccination-drive/create`: Create a new vaccination drive.
- **GET** `/vaccination-drive`: Get all vaccination drives.
- **PUT** `/vaccination-drive/update`: Update a vaccination drive.
- **GET** `/vaccination-drive/students/:id`: Get students for a specific vaccination drive.
- **GET** `/vaccination-drive/all/statistics`: Get statistics for all vaccination drives.
- **GET** `/vaccination-drive/data/statistics`: Get statistics for a specific vaccination drive.

### Students

- **POST** `/student/add`: Add a new student.
- **GET** `/student`: Get all students.
- **PUT** `/student/update`: Update student information.
- **POST** `/student/bulk-add`: Bulk add students from a file.
- **GET** `/student/download`: Download student data as a CSV file.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [kislayvats22@gmail.com](mailto:kislayvats22@gmail.com).
