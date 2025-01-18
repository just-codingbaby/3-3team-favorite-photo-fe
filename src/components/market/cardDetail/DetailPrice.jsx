// 가격 4P부분
import tail from "@/styles/tailwindcss";

export default function DetailPrice({price, children, titletext, pricetext}) {
  const {flexstanderd, stitle, pointtext} = tail;

  return (
    <div className={`${flexstanderd} justify-between`}>
      <span className={`${stitle} ${titletext} text-customGrey01`}>가격</span>
      <span className={`${pointtext} ${pricetext} text-white`}>
        {price} P
        <span className={`font-normal text-xl text-customGrey01`}>
          {children}
        </span>
      </span>
    </div>
  );
}