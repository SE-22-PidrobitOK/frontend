import IdentityRepository from "../repositories/IdentityRepository";

// API Service для роботи з бекендом
class ApiService {
  constructor() {
    this.baseURL = 'http://auth.localhost/api';
    this.token = null;
    this.refreshToken = null;
    
    // Отримуємо токени з localStorage при ініціалізації
    this.token = localStorage.getItem('authToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    
    // Ініціалізуємо репозиторії
    this.identityRepository = new IdentityRepository(this);
  }

  // Базовий метод для виконання HTTP запитів
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Додаємо токен авторизації якщо він є
    if (this.token && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Якщо токен застарів, спробуємо оновити його
      if (response.status === 401 && this.refreshToken && !options.skipRefresh) {
        const refreshResult = await this.refreshAccessToken();
        if (refreshResult) {
          // Повторюємо запит з новим токеном
          config.headers.Authorization = `Bearer ${this.token}`;
          return await fetch(url, config);
        } else {
          // Якщо не вдалося оновити токен, очищуємо дані
          this.clearTokens();
          throw new Error('Сесія закінчилася, необхідно увійти знову');
        }
      }

      return response;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Методи для роботи з Identity через репозиторій
  async register(userData) {
    try {
      const result = await this.identityRepository.register(userData);
      
      // Зберігаємо токени після успішної реєстрації
      if (result.success && result.token) {
        this.setTokens(result.token, result.refreshToken);
      }
      
      return result;
    } catch (error) {
      console.error('Registration error in ApiService:', error);
      return { 
        success: false, 
        error: error.message || 'Помилка реєстрації' 
      };
    }
  }

  async login(email, password) {
    try {
      const result = await this.identityRepository.login(email, password);
      
      // Зберігаємо токени після успішного входу
      if (result.success && result.token) {
        this.setTokens(result.token, result.refreshToken);
      }
      
      return result;
    } catch (error) {
      console.error('Login error in ApiService:', error);
      return { 
        success: false, 
        error: error.message || 'Невірний email або пароль' 
      };
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken || !this.token) {
      return false;
    }

    try {
      const result = await this.identityRepository.refreshToken(this.refreshToken, this.token);
      
      if (result.success) {
        this.setTokens(result.token, result.refreshToken);
        return true;
      }
      
      // Якщо не вдалося оновити токен, очищуємо збережені дані
      this.clearTokens();
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return false;
    }
  }

  async getUserInfo(userId) {
    try {
      const result = await this.identityRepository.getUserInfo(userId);
      return result;
    } catch (error) {
      console.error('Get user info error in ApiService:', error);
      return { 
        success: false, 
        error: error.message || 'Помилка отримання даних користувача' 
      };
    }
  }

  async changeRole(userId, roleName) {
    try {
      const result = await this.identityRepository.changeUserRole(userId, roleName);
      return result;
    } catch (error) {
      console.error('Change role error in ApiService:', error);
      return { 
        success: false, 
        error: error.message || 'Помилка зміни ролі' 
      };
    }
  }

  async banUser(userId) {
    try {
      const result = await this.identityRepository.banUser(userId);
      return result;
    } catch (error) {
      console.error('Ban user error in ApiService:', error);
      return { 
        success: false, 
        error: error.message || 'Помилка блокування користувача' 
      };
    }
  }

  // Допоміжні методи для роботи з токенами
  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
    
    localStorage.setItem('authToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
  }

  // Метод для виходу
  logout() {
    this.clearTokens();
  }

  // Перевірка чи користувач авторизований
  isAuthenticated() {
    return !!this.token;
  }

  // Отримання поточного токену
  getToken() {
    return this.token;
  }

  // Гетери для репозиторіїв
  get identity() {
    return this.identityRepository;
  }
}

// Створюємо єдиний екземпляр API сервісу
const apiService = new ApiService();

export default apiService;