# WebTech2024-Frontend Task Management System

## Project Description

WebTech2024-Frontend is the frontend application for a task management system. This application allows users to create, update, delete, and filter tasks using a user-friendly interface built with Vue.js.

## Features

- List tasks
- Create a task
- Update a task
- Delete a task
- Toggle task status (Completed/Pending)
- Filter tasks (All Tasks, Completed, Pending)

## Requirements

- Node.js
- npm or yarn

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd WebTech2024-Frontend
    ```

2. **Install the necessary dependencies:**

    ```bash
    npm install
    ```

   or

    ```bash
    yarn install
    ```

## Running the Application

1. **Start the development server:**

    ```bash
    npm run serve
    ```

   or

    ```bash
    yarn serve
    ```

2. **Verify the application is running:**

   Open your browser and go to `http://localhost:8080` to ensure the application is working.

## Usage

### API Configuration

Ensure your API endpoint is correctly set up in `src/services/api.js`:

```javascript
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api/tasks',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getTasks() {
        return apiClient.get('/');
    },
    createTask(task) {
        return apiClient.post('/', task);
    },
    updateTask(id, task) {
        return apiClient.put(`/${id}`, task);
    },
    deleteTask(id) {
        return apiClient.delete(`/${id}`);
    }
};


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
