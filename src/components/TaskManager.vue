<template>
  <div class="task-manager">
    <h1 class="title">Task Manager</h1>
    <div class="filter-buttons">
      <button class="filter-button" @click="filterTasks('all')">All</button>
      <button class="filter-button" @click="filterTasks('completed')">Completed</button>
      <button class="filter-button" @click="filterTasks('pending')">Pending</button>
    </div>
    <div class="task-card" v-for="task in filteredTasks" :key="task.id">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-description">{{ task.description }}</p>
      <p class="task-status">Status: <strong>{{ task.done ? 'Completed' : 'Pending' }}</strong></p>
      <p class="task-due-date">Due Date: {{ new Date(task.dueDate).toLocaleDateString() }}</p>
      <button class="task-button" @click="toggleTaskStatus(task)">Mark as {{ task.done ? 'Pending' : 'Completed' }}</button>
      <button class="task-button" @click="editTask(task)">Edit</button>
      <button class="task-button" @click="deleteTask(task.id)">Delete</button>
    </div>
    <div class="new-task-form">
      <input v-model="newTask.title" placeholder="Title" />
      <input v-model="newTask.description" placeholder="Description" />
      <input v-model="newTask.dueDate" type="date" />
      <button class="task-button" @click="createOrUpdateTask">{{ isEditing ? 'Update Task' : 'Add Task' }}</button>
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
        title: '',
        description: '',
        dueDate: ''
      },
      isEditing: false,
      editTaskId: null,
      filterStatus: 'all'
    };
  },
  computed: {
    filteredTasks() {
      if (this.filterStatus === 'all') {
        return this.tasks;
      }
      return this.tasks.filter(task => this.filterStatus === 'completed' ? task.done : !task.done);
    }
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
    createOrUpdateTask() {
      if (this.isEditing) {
        api.updateTask(this.editTaskId, this.newTask).then(() => {
          this.isEditing = false;
          this.editTaskId = null;
          this.resetNewTask();
          this.fetchTasks();
        }).catch(error => {
          console.error("Error updating task:", error);
        });
      } else {
        api.createTask(this.newTask).then(() => {
          this.resetNewTask();
          this.fetchTasks();
        }).catch(error => {
          console.error("Error creating task:", error);
        });
      }
    },
    editTask(task) {
      this.isEditing = true;
      this.editTaskId = task.id;
      this.newTask = { ...task };
    },
    deleteTask(id) {
      api.deleteTask(id).then(() => {
        this.fetchTasks();
      }).catch(error => {
        console.error("Error deleting task:", error);
      });
    },
    resetNewTask() {
      this.newTask = {
        title: '',
        description: '',
        dueDate: ''
      };
    },
    filterTasks(status) {
      this.filterStatus = status;
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

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
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
  margin-right: 10px;
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
