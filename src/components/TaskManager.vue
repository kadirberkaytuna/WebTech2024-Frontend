<template>
  <div class="task-manager">
    <h1 class="title">Task Manager</h1>
    <div class="task-card" v-for="task in tasks" :key="task.id">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-id">{{ task.id }}</p>
      <p class="task-description">{{ task.description }}</p>
      <p class="task-status">Status: <strong>{{ task.done ? 'Completed' : 'Pending' }}</strong></p>
      <p class="task-due-date">Due Date: {{ new Date(task.dueDate).toLocaleDateString() }}</p>
      <button class="task-button" @click="toggleTaskStatus(task)">Mark as {{ task.done ? 'Pending' : 'Completed' }}</button>
    </div>
    <div class="new-task-form">
      <input v-model="newTask.id" placeholder="Id" />
      <input v-model="newTask.title" placeholder="Title" />
      <input v-model="newTask.description" placeholder="Description" />
      <input v-model="newTask.dueDate" type="date" />
      <button class="task-button" @click="createTask">Add Task</button>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'TaskManager',
  data() {
    return {
      tasks: [],
      newTask: {
        id: '',
        title: '',
        description: '',
        dueDate: '',
        done: false
      }
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      api.getTasks().then(response => {
        this.tasks = response.data;
      }).catch(error => {
        console.error("Error fetching tasks:", error);
      });
    },
    toggleTaskStatus(task) {
      task.done = !task.done;
      api.updateTask(task.id, task).then(() => {
        this.fetchTasks();
      }).catch(error => {
        console.error("Error updating task:", error);
      });
    },
    createTask() {
      const task = {
        id: this.newTask.id,
        title: this.newTask.title,
        description: this.newTask.description,
        done: this.newTask.done,
        dueDate: this.newTask.dueDate
      };
      api.createTask(task).then(() => {
        this.newTask.id = '';
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.dueDate = '';
        this.newTask.done = false;
        this.fetchTasks();
      }).catch(error => {
        console.error("Error creating task:", error);
      });
    }
  }
}
</script>

<style scoped>
.task-manager {
  width: 80%;
  margin: auto;
}

.title {
  text-align: center;
  color: #2c3e50;
}

.task-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.task-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.task-button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.new-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.new-task-form input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
}

.new-task-form button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
