import tail from "@/styles/tailwindcss";
import { Btn } from "./buyer";
import Link from "next/link";
import { Title } from "@/pages/buyphoto";
import { useState } from "react";

// 기본 노랑색 버튼
export function CloseBtn({ position, onClose }) {
  const closeBtn = `absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2`;
  return (
    <button
      className={`absolute ${position} bg-transparent border-[1px] border-transparent cursor-pointer`}
      onClick={onClose}
    >
      <span class={`${closeBtn} rotate-45`}></span>
      <span class={`${closeBtn} -rotate-45`}></span>
    </button>
  );
}

// export function BorderBtn({ children, btnstyle, href, onClick, onClose }) {
//   const { flexcenter } = tail;
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       onClose={onClose}
//       className={`${flexcenter} ${btnstyle} bg-transparent border border-white`}
//     >
//       <span className={`text-lg text-white font-medium`}>{children}</span>
//     </Link>
//   );
// }

// 흰선 버튼 (예:취소하기)
export function BorderBtn({ children, btnstyle, onClick }) {
  const { flexcenter } = tail;
  return (
    <button
      onClick={onClick}
      className={`${flexcenter} ${btnstyle} bg-transparent border border-white`}
    >
      <span className={`text-lg text-white font-medium`}>{children}</span>
    </button>
  );
}

// 구매/교환제시 성공,실패
export function ModalContent({
  modalbox,
  onClose,
  text = "",
  state,
  btnText = "",
  children,
  href = "#",
}) {
  const { dimbg, flexcenter } = tail;

  return (
    <div className={`${dimbg} bg-opacity-100`}>
      <div className={`${modalbox}  ${flexcenter} flex-col relative`}>
        <CloseBtn position={`top-0 right-0`} onClose={onClose} />
        <h3 className={`text-xl font-baskin font-bold text-white mt-[80px]`}>
          <span className="text-white  text-[46px] font-bold mr-[10px]">
            {text}
          </span>
          <span
            className={`${
              state ? "text-customMain" : "text-customGrey01"
            }  text-[46px] font-bold`}
          >
            {/* if (state) '성공' else '실패' */}
            {state ? "성공" : "실패"}
          </span>
        </h3>
        <span className={`text-white font-bold text-xl mt-[40px]`}>
          {children}
        </span>
        <BorderBtn btnstyle=" w-full max-w-[440px] h-[60px] mt-[60px]">
          {btnText}
        </BorderBtn>
      </div>
    </div>
  );
}

// 포토카드 구매 모달, 교환 제시 취소 (처음 나오는 기본 모달)
export default function ModalStandard({
  modalbox,
  modaltitle,
  modaltext,
  closeposition,
  onClick,
  onClose,
  children,
}) {
  const { dimbg, flexcenter, stitle } = tail;

  return (
    <div className={`${dimbg} bg-opacity-80`}>
      <div className={`${modalbox}  ${flexcenter} flex-col relative`}>
        <h3 className={`${stitle} font-sans text-white mt-[80px]`}>
          {modaltitle}
        </h3>
        <span className={`text-white text-[16px] font-normal mt-[40px]`}>
          {modaltext}
        </span>
        <CloseBtn
          position={`${closeposition} top-[46px] right-[46px]`}
          onClose={onClose}
        />
        {children}
      </div>
    </div>
  );
}

// 포토카드 교환하기 모달 창
export function ModalExchange({
  modalbox,
  children,
  onClick,
  onClose,
  className,
}) {
  const { dimbg } = tail;

  return (
    <div className={`${dimbg} ${className} bg-opacity-80`} onClick={onClick}>
      <div
        className={`${modalbox} mx-auto bg-[#161616] relative border border-white`}
      >
        <CloseBtn
          position="top-[150px] right-[180px] absolute"
          onClose={onClose}
        />
        <div className={`max-w-[920px] mx-auto bg-[#161616] `}>{children}</div>
      </div>
    </div>
  );
}

// ㄷEx 빼고 넣고 하려고 만든건데 다시 한 번 생각해봐야 할 듯
export function ExchangeList({ onClick, onClose }) {
  const [isEx, setIsEx] = useState(true); // 상태 관리

  return (
    <div>
      <Title title="내가 제시한 교환 목록" className="mt-[120px] w-full" />
      {isEx && (
        <Ex
          className={`w-[440px] h-[600px] mt-[40px] border border-white`}
          // onClose={onClose}
          onClick={(e) => {
            e.stopPropagation();
            onClick;
          }}
        >
          <BorderBtn
            btnstyle={`w-[210px] h-[60px] text-white`}
            onClick={onClick}
            onClose={(e) => {
              e.stopPropagation(); // 이벤트 전파 방지
              onClose;
            }}
          >
            취소하기
          </BorderBtn>
        </Ex>
      )}
    </div>
  );
}

// 임시로 만든거 여기에 지연님 포토카드 컴포넌트 넣을꺼임
export function Ex({ className, onClick, children }) {
  const { flexcenter } = tail;
  return (
    <div className={`${className} ${flexcenter} flex-col`} onClick={onClick}>
      <div>img</div>
      <div>text</div>
      {children}
    </div>
  );
}

export function ExchangeDetail({ onClose }) {
  const { flexstanderd } = tail;

  return (
    <div>
      <ModalExchange
        className="bg-opacity-0"
        modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
        children=""
        //  onClick={}
        onClose={onClose}
      >
        <Title
          location="포토카드 교환하기"
          title="How Far I’ll Go"
          className="mb-[20px]"
        />
        <div className={`flex justify-between mt-[20px]`}>
          <Ex className={`w-[440px] h-[600px] border border-white`} />
          <div className={`max-w-[440px] w-full flex flex-col`}>
            <h3 className="text-xl font-bold mb-[10px]">교환 제시 내용</h3>
            <div>
              <input
                className="border border-white w-full h-[120px] px-5
                py-5 bg-transparent text-[16px] font-light"
                placeholder="내용을 입력해 주세요"
              />
            </div>
            <div className={` ${flexstanderd} justify-between mt-[60px]`}>
              <BorderBtn
                btnstyle={`w-[210px] h-[60px] text-white`}
                onClick={onClose}
              >
                취소하기
              </BorderBtn>
              <Btn
                className={` w-[210px] h-[60px] text-[#0F0F0F]`}
                // onClick={}
              >
                교환하기
              </Btn>
            </div>
          </div>
        </div>
      </ModalExchange>
    </div>
  );
}
