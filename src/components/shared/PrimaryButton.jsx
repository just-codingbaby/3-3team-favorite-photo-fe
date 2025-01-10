export default function PrimaryButton({ label, width, height, handleClick, textSize, textColor = "text-white" }) {
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
      className={`bg-customMain rounded-sm font-bold leading-7 flex justify-center items-center ${textSizeClass} ${textColor}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
