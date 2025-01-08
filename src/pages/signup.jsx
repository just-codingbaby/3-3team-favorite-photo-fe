import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      />

      <div className="w-full max-w-[520px] bg-black p-8">
        <form className="text-left">
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
            />
          </div>

          {/* 닉네임 입력 */}
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-lg font-normal text-gray-300 mb-2"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              className="w-full h-[60px] px-4 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-lg font-normal text-gray-300 mb-2"
            >
              비밀번호
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="8자 이상 입력해 주세요"
              className="w-full h-[60px] px-4 pr-14 border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[62px] transform -translate-y-1/2 right-4 flex items-center justify-center "
              style={{ width: "24px", height: "24px" }}
            >
              <Image
                width={24}
                height={24}
                src={
                  showPassword
                    ? "/images/type=visible.png" // 눈 떠진 아이콘 경로
                    : "/images/type=invisible.png" // 눈 감긴 아이콘 경로
                }
                alt="Toggle Password Visibility"
              />
            </button>
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-6 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-normal text-gray-300 mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className="w-full h-[60px] px-4 pr-14 border border-gray-200 bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute top-[62px] transform -translate-y-1/2 right-4 flex items-center justify-center"
              style={{ width: "24px", height: "24px" }}
            >
              <Image
                width={24}
                height={24}
                src={
                  showPassword
                    ? "/images/type=visible.png" // 눈 떠진 아이콘 경로
                    : "/images/type=invisible.png" // 눈 감긴 아이콘 경로
                }
                alt="Toggle Confirm Password Visibility"
              />
            </button>
          </div>

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            className="w-full h-[60px] bg-customMain text-black text-lg font-bold hover:bg-customMain/80 transition"
          >
            가입하기
          </button>
        </form>

        {/* 로그인 안내문 */}
        <p className="mt-6 text-center text-white font-noraml text-base">
          이미 최애의 포토 회원이신가요?{" "}
          <Link
            href="/login"
            className="text-customMain underline hover:no-underline"
          >
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
