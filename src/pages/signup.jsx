import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import EmailInput from "@/components/shared/EmailInput";
import NickNameInput from "@/components/signUp/NickNameInput";
import PasswordInput from "@/components/shared/PasswordInput";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickName: "",
    confirmPassword: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, nickName, password } = formData;
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/signup", {
        email,
        nickName,
        password,
      });
      alert("성공");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const isEmailError =
    formData.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isPasswordError =
    formData.password !== "" && formData.password.length < 8;

  const isConfirmPasswordError =
    formData.confirmPassword !== "" &&
    formData.password !== formData.confirmPassword;

  const disabled =
    formData.email === "" ||
    formData.nickName === "" ||
    formData.password === "" ||
    formData.confirmPassword === "" ||
    isEmailError ||
    isPasswordError ||
    isConfirmPasswordError;

  const errorFontClass = "text-customRed text-sm leading-6 font-light";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center mt-4">
      {/* 로고 */}
      <Image
        src="/images/main_logo.png"
        alt="최애의포토 로고"
        width={330.82}
        height={60}
        className="mb-12"
      />

      <form className="flex flex-col w-auto gap-[10px]">
        {/* 이메일 입력 */}
        <EmailInput
          size="L"
          value={formData.email}
          handleChange={handleFormData}
          isError={isEmailError}
        />
        {isEmailError && (
          <p className={errorFontClass}>이메일 형식이 아닙니다.</p>
        )}

        {/* 닉네임 입력 */}
        <NickNameInput
          size="L"
          value={formData.nickName}
          handleChange={handleFormData}
        />

        {/* 비밀번호 입력 */}
        <div>
          <PasswordInput
            size="L"
            value={formData.password}
            handleChange={handleFormData}
            isError={isPasswordError}
            errorMessage="8자 이상 입력해 주세요"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <PasswordInput
            label="비밀번호 확인"
            size="L"
            value={formData.confirmPassword}
            handleChange={handleFormData}
            isError={isConfirmPasswordError}
            errorMessage="비밀번호가 일치하지 않습니다"
          />
        </div>

        {/* 가입하기 버튼 */}
        <PrimaryButton
          label="가입하기"
          type="submit"
          textSize="lg"
          width="520px"
          height="60px"
          handleClick={handleSubmit}
          disabled={disabled}
        />
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
  );
}

Signup.getLayout = function getLayout(page) {
  return <>{page}</>;
};
