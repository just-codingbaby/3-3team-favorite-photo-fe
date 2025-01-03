export default function GradeCard({
  grade,
  amount,
  size, //L,M,S
}) {
  const borderColor = {
    common: "border-customMain",
    rare: "border-customBlue",
    "super-rare": "border-customPurple",
    legendary: "border-customRed",
  };

  const textColor = {
    common: "text-customMain",
    rare: "text-customBlue",
    "super-rare": "text-customPurple",
    legendary: "text-customRed",
  };

  const textSize = {
    L: "text-base",   //16px
    M: "text-sm",     //14px
    S: "text-xs",     //12px
  };

  const formattedGrade = grade.replace('-', ' ');

  return (
    <div
      className={`flex gap-3 justify-center px-5 pb-[3px] bg-black border ${borderColor[grade]} ${textSize[size]}`}
      style={{ width: "fit-content" }}
    >
      <div className={textColor[grade]}>{formattedGrade.toUpperCase()}</div>
      <div className={textColor[grade]}>{amount}장</div>
    </div>
  );
}
