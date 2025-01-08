import React, { createContext, useContext, useState, useEffect } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {  // user: 로그인한 사용자 정보
    // 세션 스토리지에서 사용자 데이터를 가져옴
    const storedUser = sessionStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 로그인 함수
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("userData", JSON.stringify(userData)); // 세션 스토리지에 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userData"); // 세션 스토리지에서 제거
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

      sessionStorage.setItem("userData", JSON.stringify(updatedUser)); // 업데이트된 사용자 데이터 저장
      return updatedUser;
    });
  };

  // AuthContext에서 제공할 값
  const value = {
    user,
    login,
    logout,
    updatePoints,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuthStore 훅 (Zustand와 동일한 사용법 제공)
export function useAuthStore() {
  return useContext(AuthContext);
}
