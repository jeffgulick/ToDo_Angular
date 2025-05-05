# ToDo_Angular

A simple todo application built with Angular frontend and Node.js/Express backend.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB running locally or connection string to MongoDB instance

## Setup

1. Clone the repository:
```sh
git clone https://github.com/yourusername/ToDo_Angular.git
cd ToDo_Angular
```

2. Install backend dependencies:
```sh
npm install
```

3. Install frontend dependencies:
```sh
cd client/todoapp
npm install
```

4. Create a `.env` file in the root directory with your MongoDB connection string:
```
DB_CONNECTION_STRING=your_mongodb_connection_string
```

## Running the Application

1. Start the backend server (from the root directory):
```sh
node index.js
```
The backend will run on http://localhost:5038

2. Start the Angular frontend (from client/todoapp directory):
```sh
ng serve
```
The frontend will run on http://localhost:4200

3. Open your browser and navigate to http://localhost:4200

## Features

- Add new tasks/notes
- View list of tasks
- Delete tasks
- Real-time updates