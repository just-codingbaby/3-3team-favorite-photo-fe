import { createContext, useState } from "react";
import axios from "@/lib/axios";
import { useContext } from "react";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.')
  }

  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMyProfile(email) {
    try {
      const res = await axios.get(`/api/v1/users/profile/${email}`);
      const profile = res.data;
      setUser(profile);
    } catch (err) {
      console.log('프로필 조회 에러:',err);
    }
  }

  async function login({ email, password }) {
    const res = await axios.post("/api/v1/auth/login", { email, password });
    const resultEmail = res.data.user.email;
    
    await getMyProfile(resultEmail);
  }

  async function logout() {   //임시입니다
    try {
      await axios.post("/api/v1/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("로그아웃 에러:", err);
    }
  }
  

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
