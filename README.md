# Node.js Task Manager App

This Node.js application serves as a task manager. It allows users to register, log in, create tasks, and manage them effectively.

## Features

- User Authentication: Users can register and log in to the application.
- Task Management: Users can create, update, delete, and view tasks.
- Secure: Authentication is done securely using bcrypt for password hashing.
- MongoDB: Uses MongoDB for database storage.
- Express.js: Built with Express.js for handling HTTP requests.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/dxtaner/nodejs-taskmanager
    ```

2. Navigate to the project directory:

    ```bash
    cd nodejs-task-manager-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Define `PORT` and `MONGODB_URL` variables.

5. Run the application:

    ```bash
    npm start
    ```

6. Access the application in your browser at `http://localhost:3000`.

## API Endpoints

- User API:
    - `POST /users`: Register a new user.
    - `POST /users/login`: Login with existing user credentials.
    - `POST /users/logout`: Logout the user.
    - `GET /users/me`: Get user profile.
    - `PATCH /users/me`: Update user profile.
    - `DELETE /users/me`: Delete user profile.

- Task API:
    - `POST /tasks`: Create a new task.
    - `GET /tasks`: Get all tasks.
    - `GET /tasks/:id`: Get task by ID.
    - `PATCH /tasks/:id`: Update task.
    - `DELETE /tasks/:id`: Delete task.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
