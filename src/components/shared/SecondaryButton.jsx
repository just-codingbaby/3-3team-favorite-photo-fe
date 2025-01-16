export default function SecondaryButton({
  label,
  width,
  height,
  handleClick,
  textSize,
  className,
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
      className={`${className} bg-transparent border rounded-sm font-bold leading-7 text-white flex justify-center items-center ${textSizeClass}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
