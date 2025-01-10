import React, { useState } from "react";
import { login } from "./api/api"; 
const Login = () => {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [showPassword, setShowPassword] = useState(false); //비밀번호 보여주기
  const [message, setMessage] = useState(""); // 로그인 결과 메시지

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const data = await login(email, password); // 로그인 API 호출
      setMessage(`로그인 성공! 환영합니다, ${data.user.nickName}`);
      console.log("로그인 성공:", data);

      
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

     
      window.location.href = "/market";
    } catch (error) {
      setMessage(error.message || "로그인 실패");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* 로고 */}
      <Image
        src="/images/main_logo.png"
        alt="최애의포토 로고"
        width={330.82}
        height={60}
        className="mb-12"
        priority
      />

      <div className="w-full max-w-[520px] bg-black p-8 rounded-lg">
        <form onSubmit={handleLogin} className="text-left">
          {/* 이메일 입력 */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-normal text-gray-300 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              className="w-full h-[60px] px-4 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={email} // 이메일 상태 연결
              onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-lg font-normal text-gray-300 mb-2"
            >
              비밀번호
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full h-[60px] px-4 pr-12 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={password} // 비밀번호 상태 연결
              onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute flex right-5 top-0.5 mt-10 items-center justify-center"
              style={{ width: "24px", height: "24px" }}
            >
              <Image
                width={24}
                height={24}
                src={
                  showPassword
                    ? "/images/type=visible.png" // 눈 떠짐
                    : "/images/type=invisible.png" // 눈 감음
                }
                alt="Toggle Password Visibility"
              />
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full h-[60px] bg-customMain text-black font-semibold hover:bg-customMain/80 transition"
          >
            로그인
          </button>
        </form>

        {/* 로그인 메시지 출력 */}
        {message && (
          <p className="mt-4 text-center text-yellow-400 font-medium">{message}</p>
        )}

        {/* 회원가입 안내문 (중앙 정렬) */}
        <p className="mt-6 text-center text-white font-normal text-base">
          최애의 포토가 처음이신가요?{" "}
          <a
            href="/signup"
            className="text-customMain underline hover:no-underline"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
