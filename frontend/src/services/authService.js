import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const data = await api.post('/auth/login', credentials);
      if (data.token) {
        localStorage.setItem('foodbridge_token', data.token);
      }
      return data;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  },
  register: async (userData) => {
    try {
      const user = await api.post('/auth/register', userData);
      // Auto login after registration
      const loginData = await api.post('/auth/login', {
        email: userData.email,
        password: userData.password
      });
      if (loginData.token) {
        localStorage.setItem('foodbridge_token', loginData.token);
      }
      return loginData;
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  },
  logout: () => {
    localStorage.removeItem('foodbridge_token');
    localStorage.removeItem('foodbridge_user');
  },
  getCurrentUser: () => {
    const data = localStorage.getItem('foodbridge_user');
    return data ? JSON.parse(data) : null;
  }
};

export default authService;
