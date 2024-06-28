import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api/tasks', // Çevresel değişken veya localhost URL'i
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getTasks() {
        return apiClient.get('/tasks');
    },
    createTask(task) {
        return apiClient.post('/tasks', task);
    },
    updateTask(id, task) {
        return apiClient.put(`/tasks/${id}`, task);
    },
    deleteTask(id) {
        return apiClient.delete(`/tasks/${id}`);
    },
    filterTasks(status) {
        return apiClient.get(`/tasks/filter`, { params: { status } });
    }
};
