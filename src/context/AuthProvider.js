import React, { createContext, useContext, useState, useEffect } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 사용자 상태 초기화

  // 브라우저 환경에서 세션 스토리지에서 사용자 데이터를 가져오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // 사용자 데이터를 상태에 설정
      }
    }
  }, []);

  // 로그인 함수
  const login = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userData", JSON.stringify(userData)); // 세션 스토리지에 저장
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("userData"); // 세션 스토리지에서 제거
    }
  };

  // 포인트 업데이트 함수
  const updatePoints = (newPoints) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = {
        ...prevUser,
        data: {
          ...prevUser.data,
          point: newPoints, // 포인트 업데이트
        },
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("userData", JSON.stringify(updatedUser)); // 세션 스토리지에 저장
      }

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePoints }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuthStore 훅 (Zustand와 동일한 사용법 제공)
export function useAuthStore() {
  return useContext(AuthContext);
}
