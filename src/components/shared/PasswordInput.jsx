import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

export default function PasswordInput({
  label = "비밀번호",
  value,
  handleChange,
  size,
}) {
  const sizeClass = {
    L: "w-[520px] h-[60px]",
    M: "w-[440px] h-[55px]",
    S: "w-[345px] h-[55px]",
  };

  const isValidPassword = (value) => {
    const isValid = value.length >= 8;
    return isValid;
  };

  const isError = value !== "" && !isValidPassword(value);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const borderClass = isError ? "border-customRed" : "border-white";

  return (
    <div className="relative flex flex-col gap-[10px]">
      <label className="font-normal">{label}</label>
      <Input
        name="password"
        onChange={handleChange}
        value={value}
        type={passwordVisible ? "text" : "password"}
        placeholder="비밀번호를 입력해 주세요"
        className={`border ${borderClass} focus-visible:ring-0 focus-visible:ring-transparent
        focus-visible:ring-offset-0  ${sizeClass[size]}`}
      />
      {passwordVisible ? (
        <button onClick={toggleVisible}>
          <Image
            src="/images/type=visible.png"
            width={24}
            height={24}
            alt="invisible icon"
            className="absolute right-5 top-[50px]"
          />
        </button>
      ) : (
        <button onClick={toggleVisible}>
          <Image
            src="/images/type=invisible.png"
            width={24}
            height={24}
            alt="invisible icon"
            className="absolute right-5 top-[50px]"
          />
        </button>
      )}

      {isError ? (
        <p className="text-customRed text-sm leading-6 font-light">
          8자 이상 입력해 주세요
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
