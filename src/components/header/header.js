import React, { useState, useEffect } from "react"
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {

    const user = {
      isLoggedIn: true,
      userName: "",
      points: 1540,
    };

    if (user.isLoggedIn) {
      setIsLoggedIn(true);
      setUserName(user.userName);
      setUserPoints(user.points);
    }
  }, []);

  retrun (
    <header>
      <div>
        <Image src="/A.png" alt="최애의 포토 로고"/>
      </div>

      <div>
      {isLoggedIn ? (
          //login
          <>
            <span>{userPoints} P</span>
            <button>{userName}</button>
            <a href="#" onClick={() => setIsLoggedIn(false)}>
              로그아웃
            </a>
          </>
        ) : (
          //notlogin
          <>
            <button onClick={() => (window.location.href = "/login")}>
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