export default function PrimaryButton({ label, width, height, handleClick, textSize, type="button", ...props }) {
  const textSizeClass =
    textSize === "xs"
      ? "text-xs"
      : textSize === "sm"
      ? "text-sm"
      : textSize === "base"
      ? "text-base"
      : textSize === "lg"
      ? "text-lg"
      : "text-xl";


  return (
    <button
      style={{ width, height }}
      className={`disabled:bg-black disabled:text-white disabled:border disabled:border-white text-black bg-customMain rounded-sm font-bold leading-7 flex justify-center items-center ${textSizeClass} hover:bg-customMain/80 transition`}
      onClick={handleClick}
      type={type}
      {...props} 
    >
      {label}
    </button>
  );
}
