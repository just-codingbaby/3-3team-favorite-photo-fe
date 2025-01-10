import { Input } from "../ui/input";


/* 포토카드 이름, 닉네임 Input에 대한 컴포넌트입니다 */
export default function TextFieldInput({ value, handleChange, size, label='포토카드 이름' }) {
  const sizeClass = {
    L: "w-[520px] h-[60px]",
    M: "w-[440px] h-[55px]",
    S: "w-[345px] h-[55px]",
  };

  const isValidLength = (value) => {
    const isValid = value.length <= 30;
    return isValid
  };

  const isError = value !== "" && !isValidLength(value);

  const borderClass = isError ? "border-customRed" : "border-white";

  return (
    <div className="flex flex-col gap-[10px]">
      <label className="font-normal">포토카드 이름</label>
      <Input
        name="photoCard"
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="포토카드 이름을 입력해 주세요"
        className={`border ${borderClass} focus-visible:ring-0 focus-visible:ring-transparent bg-black
        focus-visible:ring-offset-0  ${sizeClass[size]}`}
      />
      {isError ? <p className="text-customRed text-sm leading-6 font-light">포토카드 이름은 최대 30자까지 입력 가능합니다.</p> : ""}
    </div>
  );
}
