import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7111/api/v1',
    withCredentials: true
});

export default api;