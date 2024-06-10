// src/services/api.js
/**import axios from 'axios';

const API_URL = 'http://localhost:8080';

export function getTasks() {
    return axios.get(`${API_URL}/tasks`);
}
 **/
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://webtech24-backend-1.onrender.com/api', // Backend API URL'inizi buraya yazın
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

