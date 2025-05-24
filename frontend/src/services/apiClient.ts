// frontend/src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api', // Adjust if your backend runs on a different port/path
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here for request or response handling if needed later
// For example, to handle errors globally or add auth tokens

export default apiClient;