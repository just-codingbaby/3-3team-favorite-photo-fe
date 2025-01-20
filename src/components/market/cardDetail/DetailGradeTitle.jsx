import tail from '@/styles/tailwindcss';

export default function DetailGradeTitle({
  className,

  rating,
  type,
  nickname,
  titleborder,
}) {
  const { flexstanderd, pointtext } = tail;

  const ratingColors = {
    LEGENDARY: 'text-customPink',
    'SUPER RARE': 'text-customPurple',
    RARE: 'text-customBlue',
    COMMON: 'text-customMain',
  };
  const ratingClass = ratingColors[rating];

  return (
    <div className={`${className} ${pointtext} flex w-full justify-between`}>
      <div className={`${flexstanderd} relative`}>
        <h3 className={` ${ratingClass}`}>{rating}</h3>
        <div className={`${titleborder} mx-[15px] h-[30px] w-[2px] bg-customGrey03`}></div>
        <h3 className={`text-customGrey01`}>{type}</h3>
      </div>
      <h3 className={`text-white underline decoration-white decoration-2`}>{nickname}</h3>
    </div>
  );
}
