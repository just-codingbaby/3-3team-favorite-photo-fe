import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth'; // 백엔드 URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // 성공적으로 받은 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const signUp = async (email, password, nickName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signUp`, { email, password, nickName });
    return response.data; // 회원가입 성공 데이터 반환
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};
