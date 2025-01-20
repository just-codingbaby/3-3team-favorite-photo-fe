// 잔여 2/5부분
import tail from '@/styles/tailwindcss';

export default function DetailRemaining({ titletext, buytext, remaintext, buyphoto, totalphoto }) {
  const { flexstanderd, stitle, pointtext } = tail;

  return (
    <div className={`${flexstanderd} justify-between`}>
      <span className={`${stitle} ${titletext} text-customGrey01`}>잔여</span>
      <div>
        <span className={`${pointtext} ${buytext} text-white`}>{buyphoto}</span>
        <span className={`${remaintext} text-2xl font-normal text-customGrey01`}>
          / {totalphoto}
        </span>
      </div>
    </div>
  );
}
