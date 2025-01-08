import { Input } from "../ui/input";

export default function EmailInput({ value, handleChange, size }) {
  const sizeClass = {
    L: "w-[520px] h-[60px]",
    M: "w-[440px] h-[55px]",
    S: "w-[345px] h-[55px]",
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isError = value !== "" && !isValidEmail(value);

  const borderClass = isError ? "border-customRed" : "border-white";

  return (
    <div className="flex flex-col gap-[10px]">
      <label className="font-normal">이메일</label>
      <Input
        name="email"
        onChange={handleChange}
        value={value}
        type="email"
        placeholder="이메일을 입력해 주세요"
        className={`border ${borderClass} focus-visible:ring-0 focus-visible:ring-transparent
        focus-visible:ring-offset-0  ${sizeClass[size]}`}
      />
      {isError ? <p className="text-customRed text-sm leading-6 font-light">이메일 형식이 아닙니다.</p> : ""}
    </div>
  );
}
