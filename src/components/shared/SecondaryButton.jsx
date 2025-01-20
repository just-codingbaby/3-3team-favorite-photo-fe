import { cn } from '@/lib/utils';

export default function SecondaryButton({
  label,
  width,
  height,
  handleClick,
  textSize,
  className,
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
        `flex items-center justify-center rounded-sm border bg-transparent font-bold leading-7 text-white ${textSizeClass}`,
        className,
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
