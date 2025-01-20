import { cn } from '@/lib/utils';

export default function PrimaryButton({
  label,
  width,
  height,
  handleClick,
  textSize,
  type = 'button',
  className,
  ...props
}) {
  const textSizeClass =
    textSize === 'xs'
      ? 'text-xs'
      : textSize === 'sm'
        ? 'text-sm'
        : textSize === 'base'
          ? 'text-base'
          : textSize === 'lg'
            ? 'text-lg'
            : 'text-xl';

  return (
    <button
      style={{ width, height }}
      className={cn(
        `flex items-center justify-center rounded-sm bg-customMain font-bold leading-7 text-black disabled:border disabled:border-white disabled:bg-black disabled:text-white ${textSizeClass} transition hover:bg-customMain/80`,
        className,
      )}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
}
