import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/items',
});

export const getItems = (page = 1, limit = 5) =>
  API.get(`/?page=${page}&limit=${limit}`);

export const addItem = (data) => API.post('/', data);
export const deleteItem = (id) => API.delete(`/${id}`);

