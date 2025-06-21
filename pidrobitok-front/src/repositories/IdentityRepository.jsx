// Репозиторій для роботи з Identity API
class IdentityRepository {
  constructor(apiService) {
    this.apiService = apiService;
  }

  /**
   * Реєстрація нового користувача
   * @param {Object} userData - Дані користувача для реєстрації
   * @param {string} userData.firstName - Ім'я
   * @param {string} userData.lastName - Прізвище
   * @param {string} userData.email - Email
   * @param {string} userData.password - Пароль
   * @param {string} userData.role - Роль користувача ('student' або 'employer')
   * @returns {Promise<Object>} Результат реєстрації
   */
  async register(userData) {
    try {
      console.log('Sending registration data:', userData);
      
      // Валідація даних перед відправкою
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.role) {
        throw new Error('Всі поля є обов\'язковими для заповнення');
      }

      if (!['student', 'employer'].includes(userData.role)) {
        throw new Error('Некоректна роль користувача');
      }
      
      const response = await this.apiService.request('/Identity/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          isStudent: userData.role === 'student' // Конвертуємо роль в boolean
        }),
        skipAuth: true
      });

      console.log('Registration response status:', response.status);
      
      if (!response.ok) {
        const errorData = await this._handleErrorResponse(response);
        console.error('Registration error details:', errorData);
        throw new Error(errorData.message);
      }

      // Обробляємо відповідь
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Registration success data (JSON):', data);
      } else {
        const textData = await response.text();
        console.log('Registration success data (TEXT):', textData);
        
        // Якщо отримали текстову відповідь, створюємо об'єкт з мінімальними даними
        data = {
          message: textData || 'Реєстрація успішна',
          success: true
        };
      }
      
      // Обробляємо успішну відповідь
      return this._processAuthResponse(data, userData);
    } catch (error) {
      console.error('Registration error in repository:', error);
      throw this._processError(error, 'Помилка реєстрації');
    }
  }

  /**
   * Вхід користувача в систему
   * @param {string} email - Email користувача
   * @param {string} password - Пароль користувача
   * @returns {Promise<Object>} Результат входу
   */
  async login(email, password) {
    try {
      // Валідація даних
      if (!email || !password) {
        throw new Error('Email та пароль є обов\'язковими');
      }

      console.log('Sending login data:', { email });
      
      const response = await this.apiService.request('/Identity/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        skipAuth: true
      });

      console.log('Login response status:', response.status);

      if (!response.ok) {
        const errorData = await this._handleErrorResponse(response);
        console.error('Login error details:', errorData);
        throw new Error(errorData.message);
      }

      // Обробляємо відповідь
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Login success data (JSON):', data);
      } else {
        const textData = await response.text();
        console.log('Login success data (TEXT):', textData);
        
        // Якщо отримали текстову відповідь, створюємо об'єкт з мінімальними даними
        data = {
          message: textData || 'Вхід успішний',
          success: true
        };
      }
      
      // Обробляємо успішну відповідь
      return this._processAuthResponse(data, { email });
    } catch (error) {
      console.error('Login error in repository:', error);
      throw this._processError(error, 'Невірний email або пароль');
    }
  }

  /**
   * Оновлення токену доступу
   * @param {string} refreshToken - Refresh токен
   * @param {string} accessToken - Access токен
   * @returns {Promise<Object>} Новий токен або false
   */
  async refreshToken(refreshToken, accessToken) {
    try {
      const response = await this.apiService.request('/Identity/refresh', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: accessToken,
          refreshToken: refreshToken
        }),
        skipAuth: true,
        skipRefresh: true
      });

      if (!response.ok) {
        console.log('Token refresh failed with status:', response.status);
        return { success: false, error: 'Не вдалося оновити токен' };
      }

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Token refresh success:', data);
      } else {
        console.log('Token refresh: non-JSON response');
        return { success: false, error: 'Отримано некоректну відповідь від сервера' };
      }
      
      if (data.accessToken || data.token) {
        return {
          success: true,
          token: data.accessToken || data.token,
          refreshToken: data.refreshToken || refreshToken
        };
      }

      return { success: false, error: 'Отримано некоректну відповідь від сервера' };
    } catch (error) {
      console.error('Token refresh error in repository:', error);
      return { success: false, error: 'Помилка оновлення токену' };
    }
  }

  /**
   * Отримання інформації про користувача
   * @param {string} userId - ID користувача
   * @returns {Promise<Object>} Дані користувача
   */
  async getUserInfo(userId) {
    try {
      if (!userId) {
        throw new Error('ID користувача є обов\'язковим');
      }

      const response = await this.apiService.request(`/Identity/getUserInfo/${userId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const errorData = await this._handleErrorResponse(response);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return {
        success: true,
        user: data
      };
    } catch (error) {
      console.error('Get user info error in repository:', error);
      throw this._processError(error, 'Помилка отримання даних користувача');
    }
  }

  /**
   * Зміна ролі користувача
   * @param {string} userId - ID користувача
   * @param {string} roleName - Назва нової ролі
   * @returns {Promise<Object>} Результат зміни ролі
   */
  async changeUserRole(userId, roleName) {
    try {
      if (!userId || !roleName) {
        throw new Error('ID користувача та назва ролі є обов\'язковими');
      }

      const response = await this.apiService.request('/Identity/changeRole', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          roleName: roleName
        })
      });

      if (!response.ok) {
        const errorData = await this._handleErrorResponse(response);
        throw new Error(errorData.message);
      }

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        data = { message: textData || 'Роль змінена успішно', success: true };
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Change role error in repository:', error);
      throw this._processError(error, 'Помилка зміни ролі користувача');
    }
  }

  /**
   * Блокування користувача
   * @param {string} userId - ID користувача
   * @returns {Promise<Object>} Результат блокування
   */
  async banUser(userId) {
    try {
      if (!userId) {
        throw new Error('ID користувача є обов\'язковим');
      }

      const response = await this.apiService.request(`/Identity/banUser?userId=${userId}`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await this._handleErrorResponse(response);
        throw new Error(errorData.message);
      }

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        data = { message: textData || 'Користувача заблоковано', success: true };
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Ban user error in repository:', error);
      throw this._processError(error, 'Помилка блокування користувача');
    }
  }

  /**
   * Приватний метод для обробки помилок HTTP відповідей
   * @param {Response} response - HTTP відповідь
   * @returns {Promise<Object>} Об'єкт з даними помилки
   */
  async _handleErrorResponse(response) {
    try {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.log('Error response data:', errorData);
        
        // Обробляємо різні формати помилок від API
        let message = 'Невідома помилка сервера';
        
        if (errorData.message) {
          message = errorData.message;
        } else if (errorData.title) {
          message = errorData.title;
        } else if (errorData.errors) {
          // Якщо є validation errors
          const firstError = Object.values(errorData.errors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            message = firstError[0];
          } else if (typeof firstError === 'string') {
            message = firstError;
          }
        } else if (typeof errorData === 'string') {
          message = errorData;
        }

        return {
          message: message,
          status: response.status,
          statusText: response.statusText,
          details: errorData
        };
      } else {
        // Якщо відповідь не JSON, читаємо як текст
        const textData = await response.text();
        console.log('Error response text:', textData);
        
        return {
          message: textData || `Помилка сервера: ${response.status} ${response.statusText}`,
          status: response.status,
          statusText: response.statusText
        };
      }
    } catch (parseError) {
      console.error('Error parsing error response:', parseError);
      // Якщо не вдалося розпарсити відповідь
      return {
        message: `Помилка сервера: ${response.status} ${response.statusText}`,
        status: response.status,
        statusText: response.statusText
      };
    }
  }

  /**
   * Приватний метод для обробки відповідей авторизації
   * @param {Object} data - Дані від API
   * @param {Object} originalUserData - Оригінальні дані користувача (для реєстрації)
   * @returns {Object} Оброблена відповідь
   */
  _processAuthResponse(data, originalUserData = null) {
    try {
      // Визначаємо роль користувача
      let userRole = 'student'; // за замовчуванням
      
      if (originalUserData && originalUserData.role) {
        userRole = originalUserData.role;
      } else if (data.role) {
        userRole = data.role;
      } else if (data.isStudent !== undefined) {
        userRole = data.isStudent ? 'student' : 'employer';
      }

      // Створюємо об'єкт користувача
      const userData = {
        id: data.id || data.userId || originalUserData?.id || null,
        email: data.email || originalUserData?.email || '',
        firstName: data.firstName || originalUserData?.firstName || '',
        lastName: data.lastName || originalUserData?.lastName || '',
        userName: data.userName || data.email || originalUserData?.email || '',
        role: userRole
      };

      console.log('Processed user data:', userData);

      return {
        success: true,
        user: userData,
        token: data.token || data.accessToken || null,
        refreshToken: data.refreshToken || null
      };
    } catch (error) {
      console.error('Error processing auth response:', error);
      throw new Error('Помилка обробки відповіді сервера');
    }
  }

  /**
   * Приватний метод для обробки помилок
   * @param {Error} error - Помилка
   * @param {string} defaultMessage - Повідомлення за замовчуванням
   * @returns {Error} Оброблена помилка
   */
  _processError(error, defaultMessage) {
    if (error && error.message) {
      return error;
    }
    return new Error(defaultMessage);
  }
}

export default IdentityRepository;