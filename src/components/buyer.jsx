import tail from "@/styles/tailwindcss";
import { useState } from "react";
import ModalStandard from "./modal";
import { ModalContent } from "./modal";
import { ModalExchange } from "./modal";
import PrimaryButton from "./shared/PrimaryButton";

export function Btn({ className, children, absolute, onClick }) {
  const { btn } = tail;
  return (
    <button
      onClick={onClick}
      className={`${btn} ${className} ${absolute} text-[#0F0F0F]`}
    >
      {children}
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

// 가격 4P부분
export function Price({ price, children, titletext, pricetext }) {
  const { flexstanderd, stitle, pointtext } = tail;

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

// 잔여 2/5부분
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
        <span className={`${pointtext} ${buytext} text-white`}>{buyphoto}</span>
        <span
          className={`${remaintext} font-normal text-2xl text-customGrey01`}
        >
          / {totalphoto}
        </span>
      </div>
    </div>
  );
}

// 가격 잔여 부분 묶은거
export function PriceRemaining({ children }) {
  return <div className={`flex flex-col gap-[10px]`}>{children}</div>;
}

// 구매수량 부분
export function QuantityBtn({ buyphoto, ClickBuyphoto }) {
  const { flexstanderd, flexcenter } = tail;
  const plusicon = "absolute inset-0 bg-black m-auto bg-white";

  return (
    <div className={`${flexstanderd} justify-between w-full`}>
      <span className={`font-normal text-xl text-white`}>구매수량</span>
      <div className={`border border-white w-[176px] h-[50px] ${flexcenter}`}>
        <div className={` ${flexstanderd}  gap-[46px] mx-[12px]`}>
          <button
            className={`w-[12px] h-[1px] bg-white`}
            // onClick={() => setNum((prev) => Math.max(0, prev - 1))}
            onClick={() => ClickBuyphoto((prev) => Math.max(0, prev - 1))}
          ></button>
          <span className={`font-normal text-xl text-white`}>{buyphoto}</span>
          <button
            className={`relative w-[12px] h-[12px] `}
            // onClick={() => setNum((prev) => prev + 1)}
            onClick={() => ClickBuyphoto((prev) => prev + 1)}
          >
            <div className={`${plusicon} w-[2px] h-full`}></div>
            <div className={`${plusicon} h-[2px] w-full`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// 제일 큰 틀
export default function Buyer({ content, title }) {
  const [modalType, setModalType] = useState(null); // 모달 상태
  const [modalTextSate, setModalTextSate] = useState(true); // 구매 성공, 실패 모달 보려고한거
  const [info, setInfo] = useState({
    point: 4, // 가격: P / 백엔드에서 자료 가져오면 여기랑 연결
    remaining: 5, // 잔여, 구매수량 / 이것도 나중에 수정해야할 듯
    buy: 2, // 사는거
  });

  // 숫자  - 5 + 이 부분 돌리려고 만든거임 다시 확인해보셈
  const ClickBuyphoto = (updateFn) => {
    setInfo((prev) => ({
      ...prev, // 이전 상태 복사
      buy: updateFn(prev.buy), // buy 값만 업데이트
    }));
  };

  const [example, setExample] = useState({
    rating: "LEGENDARY",
    title: "포토카드",
  });

  const str = `[${example.rating} | ${example.title}] ${info.buy}장 구매에 성공했습니다!`;

  const [openModal, setOpenModal] = useState({
    standard: false,
    buy: false,
    cancel: false,
    initModal: false,
  });

  const initModal = {
    standard: false,
    buy: false,
    cancel: false,
  };

  function ModalStandardOpen() {
    if (example.buyphoto >= 1) {
      setModalType("standard");
    } else {
      alert("수량을 선택하시오");
    }
  }

  const CloseModal = () => {
    setOpenModal(initModal);
  };

  const { flexstanderd, contentborder } = tail;

  return (
    <div
      className={`flex flex-col gap-[30px] max-w-[440px] tablet:max-w-[342px]`}
    >
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
          price={info.point}
          titletext="tablet:text-lg"
          pricetext="tablet:text-xl"
        />
        <Remaining
          titletext="tablet:text-lg"
          buytext="tablet:text-xl"
          remaintext="tablet:text-xl"
          buyphoto={info.buy}
          totalphoto={info.remaining}
        />
      </PriceRemaining>
      <div className={`${contentborder}`}></div>
      <div className={`flex flex-col gap-[20px] `}>
        <QuantityBtn buyphoto={info.buy} ClickBuyphoto={ClickBuyphoto} />
        <Price price={info.point * info.buy}> ({info.buy}장)</Price>
      </div>
      {/* <Btn
        className="w-full h-[80px] mt-[50px] text-xl "
        onClick={() => setOpenModal({ ...openModal, standard: true })}
      >
        포토카드 구매하기
      </Btn> */}
      <PrimaryButton width="w-full" height="80px">
        포토카드 구매하기
      </PrimaryButton>
      {openModal.standard && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${example.rating} | ${example.title}] ${info.buy}장을 구매하시겠습니까?`}
          onClose={CloseModal}
        >
          <Btn
            className="w-[170px] h-[60px] mt-[60px] mb-[60px] text-lg text-[#0F0F0F]"
            // onClick={BuyModalOpen}
            onClick={() => setOpenModal({ ...openModal, buy: true })}
          >
            구매하기
          </Btn>
        </ModalStandard>
      )}
      {openModal.buy && (
        <ModalContent
          modalbox="w-[560px] h-[352px]"
          text="구매"
          state={modalTextSate} // 구매 실패 보려고 띄워둔거
          btnText="마이갤러리 확인하기"
          href="/test/test"
          onClose={CloseModal}
        >
          {str}
        </ModalContent>
      )}
    </div>
  );
}
