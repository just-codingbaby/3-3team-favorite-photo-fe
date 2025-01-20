import tail from '@/styles/tailwindcss';

export function Title({ location, title, className, children }) {
  const { marketlogo, titles, afborder } = tail;
  return (
    <div className={`${className} mb-[60px]`}>
      <div className={`${marketlogo}`}>{location}</div>
      <h2 className={`${titles} ${afborder} text-white`}>{title}</h2>
      {children}
    </div>
  );
}
