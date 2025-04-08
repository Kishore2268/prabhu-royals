import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://prabhu-royals.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Categories
export const getCategories = (params) => api.get('/categories', { params });
export const getCategory = (id) => api.get(`/categories/${id}`);
export const getSubcategoriesByCategory = (categoryId) => api.get(`/categories/${categoryId}/subcategories`);

// Subcategories
export const getSubcategories = (params) => api.get('/subcategories', { params });
export const getSubcategory = (id) => api.get(`/subcategories/${id}`);
export const getProductsBySubcategory = (subcategoryId, params) => api.get(`/subcategories/${subcategoryId}/products`, { params });
export const getAllSubcategories = (params) => api.get('/subcategories/all', { params });

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getAllProducts = (params) => api.get('/products/all', { params });
export const searchProducts = (query, params) => api.get('/products/search', { params: { query, ...params } });

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);

// Reviews
export const createReview = (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData);
export const getReviews = (productId) => api.get(`/products/${productId}/reviews`);

// Cart (local storage based)
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find(item => item._id === product._id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item._id === productId);
  
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

export default api; 