// src/services/api.js
/**import axios from 'axios';

const API_URL = 'http://localhost:8080';

export function getTasks() {
    return axios.get(`${API_URL}/tasks`);
}

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/tasks', // Backend API URL'inizi buraya yazın
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getData() {
        return apiClient.get('/data'); // Doğru endpoint'i kullandığınızdan emin olun
    },
    getTasks() {
        return apiClient.get('/tasks'); // Örneğin, tüm görevleri almak için
    },
    createTask(task) {
        return apiClient.post('/tasks', task); // Yeni görev oluşturmak için
    }
    // Diğer API istekleri için metodlar ekleyin
};


import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL, // Verwenden Sie die Umgebungsvariable
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getData() {
        return apiClient.get( '/data');
    },
    getTasks() {
        return apiClient.get( '/tasks');
    },
    createTask(task) {
        return apiClient.post('/tasks', task);
    },
    updateTask(id, task) {
        return apiClient.put(`/tasks/${id}`, task);
    },
    deleteTask(id) {
        return apiClient.delete(`/tasks/${id}`);
    }
};
**/
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL, // Stellen Sie sicher, dass die Umgebungsvariable korrekt gesetzt ist
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
    }
};
