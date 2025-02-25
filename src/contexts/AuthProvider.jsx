import { createContext, useContext, useEffect, useState } from 'react';

import axios from '@/lib/axios';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get('/api/v1/auth/verify');
        console.log('인증 후 데이터 값:', res);
        setUser(res.data.user);
      } catch (err) {
        console.log('유저 복원 실패', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  async function login({ email, password }) {
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      const data = res.data.user;

      setUser(data);
      console.log('프로필 조회:', data);

      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      console.log('로그인 실패:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  async function logout() {
    try {
      await axios.post('/api/v1/auth/logout', null, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error('로그아웃 에러:', err.response?.data?.message || err.message);
      throw new Error('로그아웃 실패');
    }
  }

  async function signup({ email, nickName, password }) {
    try {
      const res = await axios.post('/api/v1/auth/signup', { email, nickName, password });
      const userData = res.data.user;

      setUser(userData);

      console.log('회원가입 성공:', userData);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      console.error('회원가입 실패:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
