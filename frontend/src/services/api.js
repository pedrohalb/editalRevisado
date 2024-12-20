import axios from 'axios';

// Instância para 'items'
const API_ITEMS = axios.create({
  baseURL: 'http://localhost:3001/api/items', // Base URL para a tabela 'items'
});

// Funções para 'items'
export const getItems = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API_ITEMS.get(query);
};

export const addItem = (data) => API_ITEMS.post('/', data);
export const deleteItem = (id) => API_ITEMS.delete(`/${id}`);

// Instância para 'items2'
const API_ITEMS2 = axios.create({
  baseURL: 'http://localhost:3001/api/items2', // Base URL para a tabela 'items2'
});

// Funções para 'items2'
export const getItems2 = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API_ITEMS2.get(query);
};

export const addItem2 = (data) => API_ITEMS2.post('/', data);
export const deleteItem2 = (id) => API_ITEMS2.delete(`/${id}`);

// Instância para 'items3'
const API_ITEMS3 = axios.create({
  baseURL: 'http://localhost:3001/api/items3', // Base URL para a tabela 'items3'
});

// Funções para 'items3'
export const getItems3 = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API_ITEMS3.get(query);
};

export const addItem3 = (data) => API_ITEMS3.post('/', data);
export const deleteItem3 = (id) => API_ITEMS3.delete(`/${id}`);

const API_ITEMS4 = axios.create({
  baseURL: 'http://localhost:3001/api/items4', // Base URL para a tabela 'items4'
});

// Funções para 'items4'
export const getItems4 = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API_ITEMS4.get(query);
};

export const addItem4 = (data) => API_ITEMS4.post('/', data);
export const deleteItem4 = (id) => API_ITEMS4.delete(`/${id}`);

const API_ITEMS5 = axios.create({
  baseURL: 'http://localhost:3001/api/items5', // Base URL para a tabela 'items4'
});

// Funções para 'items4'
export const getItems5 = (page = 1, limit = 5, search = '', sort = '') => {
  let query = `/?page=${page}&limit=${limit}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (sort) query += `&sort=${sort}`;
  return API_ITEMS5.get(query);
};

export const addItem5 = (data) => API_ITEMS5.post('/', data);
export const deleteItem5 = (id) => API_ITEMS5.delete(`/${id}`);