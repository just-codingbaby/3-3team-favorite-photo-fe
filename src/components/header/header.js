import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // 임시 사용자 정보
    const user = {
      isLoggedIn: true,
      userName: "최애",
      points: 1540,
    };

    if (user.isLoggedIn) {
      setIsLoggedIn(true);
      setUserName(user.userName);
      setUserPoints(user.points);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, null, {
        withCredentials: true, // 쿠키 전송 활성화
      });

      // 로그아웃 성공 처리
      setIsLoggedIn(false);
      setUserName("");
      setUserPoints(0);

      // 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* 로고 */}
      <div>
        <Image src="/A.png" alt="최애의 포토 로고" width={120} height={40} />
      </div>

      {/* 로그인 / 로그아웃 상태 */}
      <div>
        {isLoggedIn ? (
          // 로그인 상태
          <>
            <span>{userPoints} P</span>
            <button className="ml-4">{userName}</button>
            <a href="#" onClick={handleLogout} className="ml-4 underline">
              로그아웃
            </a>
          </>
        ) : (
          // 비로그인 상태
          <>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mr-4"
            >
              로그인
            </button>
            <button onClick={() => (window.location.href = "/signup")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
