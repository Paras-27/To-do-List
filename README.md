# To-Do List App

A simple To-Do List application to help you manage your tasks efficiently.

## Features

- Create tasks with titles.
- Mark tasks as completed.
- Edit existing tasks.
- Delete tasks.

## Technologies Used

- **Frontend:** React
- **Backend:** Express.js with Node.js
- **Database:** MongoDB
- **Styling:** CSS
- **HTTP Requests:** Axios

## Setup Instructions

### Frontend

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend

   Install dependencies:
   ```

bash
npm install
Create a .env file in the root of the frontend directory and set the environment variables:

env
REACT_APP_API=http://localhost:5000
Start the development server:

The app will be available at http://localhost:3000.

Backend
Navigate to the backend directory:

cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root of the backend directory and set the environment variables:

env
PORT=5000
MONGODB_URI=<your-mongodb-uri>

Start the server:

npm start
The server will be running at http://localhost:5000.

API Endpoints
GET /tasks: Retrieve all tasks.
GET /tasks/:id: Retrieve details of a specific task.
POST /tasks: Create a new task.
PATCH /tasks/:id: Update the isCompleted attribute of a task.
DELETE /tasks/:id: Delete a task.
