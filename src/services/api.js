// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7000/api'; // Порт вашого C# API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAllProducts: () => api.get('/products'),
  createProduct: (product) => api.post('/products', product),
  getProductById: (id) => api.get(`/products/${id}`),
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;