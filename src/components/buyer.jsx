import tail from "@/styles/tailwindcss";
import { useState } from "react";
import ModalStandard from "./modal";

export function Btn({
  btname,
  width,
  height,
  ma,
  fontsize,
  absolute,
  onClick,
}) {
  const { btn } = tail;
  return (
    <button
      onClick={onClick}
      className={`${btn} ${width} ${height} ${fontsize} ${ma} ${absolute}`}
    >
      {btname}
    </button>
  );
}

export function Gradetitle({ rating, type, nickname, mt }) {
  const { flexstanderd, pointtext, titleborder } = tail;
  const ratingColors = {
    LEGENDARY: "text-customPink",
    "SUPER RARE": "text-customPurple",
    RARE: "text-customBlue",
    COMMON: "text-customMain",
  };
  const ratingClass = ratingColors[rating];

  return (
    <>
      <div className={`${flexstanderd} ${mt} relative`}>
        <h3 className={`${pointtext} ${ratingClass}`}>{rating}</h3>
        <div className={`${titleborder}`}></div>
        <h3 className={`${pointtext} text-customGrey01`}>{type}</h3>
      </div>
      <h3
        className={`${pointtext} decoration-2 underline text-white decoration-white`}
      >
        {nickname}
      </h3>
    </>
  );
}

export function Price({ price, children }) {
  const { flexstanderd, stitle, pointtext } = tail;

  return (
    <div className={`${flexstanderd} justify-between`}>
      <span className={`${stitle} text-customGrey01`}>가격</span>
      <span className={`${pointtext} text-white`}>
        {price} P{" "}
        <span className={`font-normal text-xl text-customGrey01`}>
          {children}
        </span>
      </span>
    </div>
  );
}

export function Remaining({ buyphoto, totalphoto }) {
  const { flexstanderd, stitle, pointtext } = tail;

  return (
    <div className={`flex flex-col gap-[10px]`}>
      <Price price="4" />
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
  );
}

export function QuantityBtn({ buyphoto }) {
  const { flexstanderd, flexcenter } = tail;
  const plusicon = "absolute inset-0 bg-black m-auto bg-white";

  return (
    <div className={`${flexstanderd} justify-between w-full`}>
      <span className={`font-normal text-xl text-white`}>구매수량</span>
      <div className={`border border-white w-[176px] h-[50px] ${flexcenter}`}>
        <div className={` ${flexstanderd}  gap-[46px] mx-[12px]`}>
          <div className={`w-[12px] h-[1px] bg-white`}></div>
          <span className={`font-normal text-xl text-white`}>{buyphoto}</span>
          <div className={`relative w-[12px] h-[12px] `}>
            <div className={`${plusicon} w-[2px] h-full`}></div>
            <div className={`${plusicon} h-[2px] w-full`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Buyer({ content, buyphoto }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [example, setExample] = useState({
    rating: "LEGENDARY",
    title: "포토카드",
    buyphoto: 1,
  });

  function handleClick() {
    if (example.buyphoto >= 1) {
      setIsModalOpen(true);
    } else {
      alert("수량을 선택하시오");
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const { flexstanderd, contentborder } = tail;

  return (
    <div className={`flex flex-col gap-[30px] max-w-[440px]`}>
      <div className={`${flexstanderd} justify-between`}>
        <Gradetitle rating="LEGENDARY" type="풍경" nickname="미쓰손" />
      </div>
      <div className={`${contentborder}`}></div>
      <p className={`text-white`}>{content}</p>
      <div className={`${contentborder}`}></div>
      <Remaining price="4" buyphoto="2" totalphoto="5" />
      <div className={`${contentborder}`}></div>
      <div className={`flex flex-col gap-[20px] `}>
        <QuantityBtn buyphoto="2" />
        <Price price="8">({buyphoto}장)</Price>
      </div>
      <Btn
        btname="포토카드 구매하기"
        width="w-full"
        height="h-[80px]"
        ma="mt-[50px]"
        fontsize="text-xl"
        onClick={handleClick}
      />
      {isModalOpen && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${example.rating} | ${example.title}] ${example.buyphoto}장을 구매하시겠습니까?`}
          closeposition="absolute"
          onClose={handleCloseModal} // 모달 닫기 함수 전달
        />
      )}
    </div>
  );
}
