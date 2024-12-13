import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/items',
});

// Adiciona suporte a termo de busca e ordenação
export const getItems = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API.get(query);
};

export const addItem = (data) => API.post('/', data);
export const deleteItem = (id) => API.delete(`/${id}`);
