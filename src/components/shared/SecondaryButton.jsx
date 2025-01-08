export default function SecondaryButton({ label, width, height, handleClick, textSize }) {
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
      className={`bg-black border rounded-sm font-bold leading-7 text-white flex justify-center items-center ${textSizeClass}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
