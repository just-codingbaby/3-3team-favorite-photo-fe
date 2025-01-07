import tail from "@/styles/tailwindcss";
import { useState } from "react";
import ModalStandard from "./modal";
import { ModalContent } from "./modal";
import { ModalExchange } from "./modal";

export function Btn({ className, btname, absolute, onClick }) {
  const { btn } = tail;
  return (
    <button onClick={onClick} className={`${btn} ${className} ${absolute}`}>
      {btname}
    </button>
  );
}

export function Gradetitle({ className, rating, type, nickname, titleborder }) {
  const { flexstanderd, pointtext } = tail;

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

export function Price({ price, children, titletext, pricetext }) {
  const { flexstanderd, stitle, pointtext } = tail;

  return (
    <div className={`${flexstanderd} justify-between`}>
      <span className={`${stitle} ${titletext} text-customGrey01`}>가격</span>
      <span className={`${pointtext} ${pricetext} text-white`}>
        {price} P{" "}
        <span className={`font-normal text-xl text-customGrey01`}>
          {children}
        </span>
      </span>
    </div>
  );
}

export function Remaining({
  titletext,
  buytext,
  remaintext,
  buyphoto,
  totalphoto,
}) {
  const { flexstanderd, stitle, pointtext } = tail;

  return (
    <div className={`${flexstanderd} justify-between`}>
      <span className={`${stitle} ${titletext} text-customGrey01`}>잔여</span>
      <div>
        <span className={`${pointtext} ${buytext} text-white`}>
          {buyphoto}{" "}
        </span>
        <span
          className={`${remaintext} font-normal text-2xl text-customGrey01`}
        >
          / {totalphoto}
        </span>
      </div>
    </div>
  );
}

export function PriceRemaining({ children }) {
  return <div className={`flex flex-col gap-[10px]`}>{children}</div>;
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
  const [modalType, setModalType] = useState(null); // 모달 상태
  const [modalTextSate, setModalTextSate] = useState(true);

  const [example, setExample] = useState({
    rating: "LEGENDARY",
    title: "포토카드",
    buyphoto: 1,
  });

  const str = `[${example.rating} | ${example.title}] ${example.buyphoto}장 구매에 성공했습니다!`;

  function BuyModalOpen() {
    setModalType("buy");
  }

  function ModalStandardOpen() {
    if (example.buyphoto >= 1) {
      setModalType("standard");
    } else {
      alert("수량을 선택하시오");
    }
  }

  function handleCloseModal() {
    setModalType(null);
  }

  const { flexstanderd, contentborder } = tail;

  return (
    <div
      className={`flex flex-col gap-[30px] max-w-[440px] tablet:max-w-[342px]`}
    >
      {/* <ModalExchange modalbox="max-w-[1160px] w-full h-[1000px]">
        {" "}
        123
      </ModalExchange> */}
      <div className={`${flexstanderd} justify-between`}>
        <Gradetitle
          rating="LEGENDARY"
          type="풍경"
          nickname="미쓰손"
          className="tablet:text-lg"
          titleborder={`tablet:h-[18px] mx-[10px]`}
        />
      </div>
      <div className={`${contentborder}`}></div>
      <p className={`text-white`}>{content}</p>
      <div className={`${contentborder}`}></div>
      <PriceRemaining>
        <Price
          price="4"
          titletext="tablet:text-lg"
          pricetext="tablet:text-xl"
        />
        <Remaining
          titletext="tablet:text-lg"
          buytext="tablet:text-xl"
          remaintext="tablet:text-xl"
          buyphoto="2"
          totalphoto="5"
        />
      </PriceRemaining>
      {/* <Remaining buyphoto="2" totalphoto="5" /> */}
      <div className={`${contentborder}`}></div>
      <div className={`flex flex-col gap-[20px] `}>
        <QuantityBtn buyphoto="2" />
        <Price price="8">({buyphoto}장)</Price>
      </div>
      <Btn
        className="w-full h-[80px] mt-[50px] text-xl"
        btname="포토카드 구매하기"
        onClick={ModalStandardOpen}
      />
      {modalType === "standard" && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${example.rating} | ${example.title}] ${example.buyphoto}장을 구매하시겠습니까?`}
          onClick={BuyModalOpen}
          onClose={handleCloseModal}
        />
      )}
      {modalType === "buy" && (
        <ModalContent
          modalbox="w-[560px] h-[352px]"
          text="구매"
          state={modalTextSate}
          btnText="마이갤러리 확인하기"
          href="/test/test"
          onClose={handleCloseModal} // 모달 닫기 함수 전달
        >
          {str}
        </ModalContent>
      )}
    </div>
  );
}
