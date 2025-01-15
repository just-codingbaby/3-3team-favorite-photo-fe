export default function PrimaryButton({
  className,
  label,
  width,
  height,
  handleClick,
  textSize,
}) {
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
      className={`${className} bg-customMain rounded-sm font-bold text-[#0F0F0F] leading-7 flex justify-center items-center ${textSizeClass}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
