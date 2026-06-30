import api from '../services/api';

// A dynamic generic CRUD handler builder for simple endpoints
const createCrudHandlers = (endpoint) => ({
  getAll: (params) => api.get(endpoint, { params }),
  getById: (id) => api.get(`${endpoint}/${id}`),
  create: (data) => api.post(endpoint, data),
  update: (id, data) => api.put(`${endpoint}/${id}`, data),
  delete: (id) => api.delete(`${endpoint}/${id}`),
});

// Auth endpoints as specified (custom routes)
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  googleLogin: (data) => api.post('/auth/google', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh-token'),
  forgotPassword: (data) => api.post('/auth/forgot-password', data), // expects frontend link payload
  resetPassword: (token, data) => api.put(`/auth/reset-password/${token}`, data),
  updatePassword: (data) => api.put('/auth/update-password', data),
};

// Parent route APIs with basic CRUD operations
export const usersApi = createCrudHandlers('/users');
export const vendorsApi = createCrudHandlers('/vendors');
export const categoryApi = createCrudHandlers('/categories');
export const productApi = createCrudHandlers('/products');
export const cartApi = createCrudHandlers('/cart');
export const wishlistApi = createCrudHandlers('/wishlist');
export const orderApi = createCrudHandlers('/orders');
export const reviewApi = createCrudHandlers('/reviews');
export const couponApi = createCrudHandlers('/coupons');
export const adminApi = createCrudHandlers('/admin');

export default {
  auth: authApi,
  users: usersApi,
  vendors: vendorsApi,
  categories: categoryApi,
  products: productApi,
  cart: cartApi,
  wishlist: wishlistApi,
  orders: orderApi,
  reviews: reviewApi,
  coupons: couponApi,
  admin: adminApi,
};
