import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/SimpleMail/server',
  });

export default api;