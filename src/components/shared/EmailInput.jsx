import { Input } from "../ui/input";

export default function EmailInput({ value, handleChange, size, isError }) {
  const sizeClass = {
    L: "w-[520px] h-[60px]",
    M: "w-[440px] h-[55px]",
    S: "w-[345px] h-[55px]",
  };

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
        className={`border ${borderClass} focus-visible:ring-0 focus-visible:ring-transparent bg-black
        focus-visible:ring-offset-0  ${sizeClass[size]}`}
      />
    </div>
  );
}
