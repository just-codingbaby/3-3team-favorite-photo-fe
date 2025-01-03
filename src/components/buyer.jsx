import tail from "@/styles/tailwindcss";
import { useState } from "react";

export function Btn({ btname, width, height, ma, fontsize, absolute }) {
  const { btn } = tail;
  return (
    <button
      className={`${btn} ${width} ${height} ${fontsize} ${ma} ${absolute}`}
    >
      {btname}
    </button>
  );
}

export function Gradetitle({ rating, type, mt }) {
  const { flexstanderd, pointtext, titleborder } = tail;
  const ratingColors = {
    LEGENDARY: "text-customPink",
    "SUPER RARE": "text-customPurple",
    RARE: "text-customBlue",
    COMMON: "text-customMain",
  };
  const ratingClass = ratingColors[rating];

  return (
    <div className={`${flexstanderd} ${mt} relative`}>
      <h3 className={`${pointtext} ${ratingClass}`}>{rating}</h3>
      <div className={`${titleborder}`}></div>
      <h3 className={`${pointtext} text-customGrey01`}>{type}</h3>
    </div>
  );
}

export default function Buyer({
  nickname,
  content,
  price,
  buyphoto,
  totalphoto,
}) {
  const { flexstanderd, contentborder, stitle, pointtext } = tail;

  return (
    <div className={`flex flex-col gap-[30px] max-w-[440px]`}>
      <div className={`${flexstanderd} justify-between`}>
        <Gradetitle rating="LEGENDARY" type="풍경" />
        <h3
          className={`${pointtext} decoration-2 underline text-white decoration-white`}
        >
          {nickname}
        </h3>
      </div>
      <div className={`${contentborder}`}></div>
      <p className={`text-white`}>{content}</p>
      <div className={`${contentborder}`}></div>
      <div className={`flex flex-col gap-[10px]`}>
        <div className={`${flexstanderd} justify-between`}>
          <span className={`${stitle} text-customGrey01`}>가격</span>
          <span className={`${pointtext} text-white`}>{price} P</span>
        </div>
        <div className={`${flexstanderd} justify-between`}>
          <span className={`${stitle} text-customGrey01`}>잔여</span>
          <div>
            <span className={`${pointtext} text-white`}>{buyphoto} </span>
            <span className={`font-normal text-2xl text-customGrey01`}>
              / {totalphoto}
            </span>
          </div>
        </div>
      </div>
      <div className={`${contentborder}`}></div>
      <div className={`${flexstanderd} flex-col justify-between `}>
        <div className={`${flexstanderd} justify-between w-full`}>
          <span className={`font-normal text-xl text-white`}>구매수량</span>
          <div
            className={`border border-white w-[176px] h-[50px] ${flexstanderd} justify-center`}
          >
            <div className={` ${flexstanderd}  gap-[46px] mx-[12px]`}>
              <div className={`w-[12px] h-[1px] bg-white`}></div>
              <span className={`font-normal text-xl text-white`}>
                {buyphoto}
              </span>
              <div className={`relative w-[12px] h-[12px] `}>
                <div
                  className={`absolute inset-0 bg-black m-auto w-[2px] h-full bg-white`}
                ></div>
                <div
                  className={`absolute inset-0 bg-black m-auto h-[2px] w-full bg-white`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${flexstanderd} justify-between w-full mt-[24px]`}>
          <span className={`font-normal text-xl text-white`}>총 가격</span>
          <div className={`${flexstanderd} gap-[10px]`}>
            <span className={`${pointtext} text-white`}>
              {price * buyphoto} P
            </span>
            <span className={`font-normal text-xl text-customGrey01`}>
              ({buyphoto}장)
            </span>
          </div>
        </div>
      </div>
      <Btn
        btname="포토카드 구매하기"
        width="w-full"
        height="h-[80px]"
        ma="mt-[50px]"
        fontsize="text-xl"
      />
    </div>
  );
}
