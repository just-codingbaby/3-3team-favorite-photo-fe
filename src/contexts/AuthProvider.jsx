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

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get('/api/v1/auth/verify');
        setUser(res.data.user);
      } catch(err) {
        console.log('유저 복원 실패',err);
        setUser(null);
      };
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
    //임시입니다
    try {
      // await axios.post("/api/v1/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("로그아웃 에러:", err);
    }
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
