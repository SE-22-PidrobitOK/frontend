import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Перевірка наявності токену при завантаженні додатку
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        console.error('Помилка парсингу даних користувача:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Симуляція API запиту
      // В реальному додатку тут буде запит на сервер
      const mockUsers = [
        {
          id: 1,
          email: 'student@example.com',
          firstName: 'Іван',
          lastName: 'Петренко',
          userName: 'student_ivan',
          role: 'student'
        },
        {
          id: 2,
          email: 'employer@example.com',
          firstName: 'Марія',
          lastName: 'Коваленко',
          userName: 'employer_maria',
          role: 'employer'
        }
      ];

      // Знаходимо користувача за email
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Користувача з таким email не знайдено');
      }

      // Симуляція перевірки пароля
      if (password.length < 6) {
        throw new Error('Невірний пароль');
      }

      // Симуляція затримки запиту
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Генеруємо мок токен
      const token = `mock_token_${Date.now()}`;
      
      // Зберігаємо дані в localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(foundUser));
      
      setUser(foundUser);
      
      return { success: true, user: foundUser };
    } catch (error) {
      throw new Error(error.message || 'Помилка входу в систему');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Симуляція API запиту реєстрації
      // В реальному додатку тут буде запит на сервер
      
      // Симуляція затримки запиту
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      };

      // Генеруємо мок токен
      const token = `mock_token_${Date.now()}`;
      
      // Зберігаємо дані в localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      throw new Error(error.message || 'Помилка реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    isStudent: user?.role === 'student',
    isEmployer: user?.role === 'employer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};