import { createContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
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
        setUser(res.data.user);
      } catch(err) {
        console.log('유저 복원 실패',err);
        setUser(null);
      }finally{
        setIsLoading(false);
      }
    }

    initAuth();
  }, [])

  async function login({ email, password }) {
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      const data = res.data.user;

      setUser(data);
      if (process.env.NODE_ENV === "development") {
        console.log("프로필 조회:", data);
      }
      return data;

    } catch (err) {
      const errorMessage = err.response?.data?.message || "로그인 중 오류가 발생했습니다.";
      console.log("로그인 실패:", errorMessage);
      throw new error(errorMessage);
    }
  }

  async function logout() {
    try {
      // 로그아웃 API 호출
      await axios.post("/api/v1/auth/logout", null, {
        withCredentials: true, // 쿠키를 포함해 요청 전송
      });
  
      // 유저 상태 초기화
      setUser(null);
    } catch (err) {
      console.error("로그아웃 에러:", err.response?.data?.message || err.message);
      throw new Error("로그아웃 실패");
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}
