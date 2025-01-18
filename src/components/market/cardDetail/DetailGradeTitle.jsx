import tail from "@/styles/tailwindcss";

export default function DetailGradeTitle({
 className,
 rating,
 type,
 nickname,
 titleborder
}) {
  const {flexstanderd, pointtext} = tail;

  const ratingColors = {
    LEGENDARY: "text-customPink",
    "SUPER RARE": "text-customPurple",
    RARE: "text-customBlue",
    COMMON: "text-customMain",
  };
  const ratingClass = ratingColors[rating];

  return (
    <div className={`${className} ${pointtext} flex justify-between w-full`}>
      <div className={`${flexstanderd} relative`}>
        <h3 className={` ${ratingClass}`}>{rating}</h3>
        <div
          className={`${titleborder} w-[2px] h-[30px] mx-[15px] bg-customGrey03`}
        ></div>
        <h3 className={`text-customGrey01`}>{type}</h3>
      </div>
      <h3 className={`decoration-2 underline text-white decoration-white`}>
        {nickname}
      </h3>
    </div>
  );
}