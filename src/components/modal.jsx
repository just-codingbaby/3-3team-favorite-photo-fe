import tail from "@/styles/tailwindcss";
import { Btn } from "./buyer";
import Link from "next/link";
import { useState } from "react";

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

export function BorderBtn({ children, ma, href, onClick }) {
  const { flexcenter } = tail;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${flexcenter} ${ma} w-[440px] h-[60px] border border-white`}
    >
      <span className={`text-lg text-white font-medium`}>{children}</span>
    </Link>
  );
}

export function ModalContent({
  text = "",
  state = true,
  btnText = "",
  children,
  href = "#",
}) {
  return (
    <>
      <h3 className={`text-xl font-baskin font-bold text-white mt-[80px]`}>
        <span className="text-white  text-[46px] font-bold mr-[10px]">
          {text}
        </span>
        <span
          className={`${
            state ? "text-customMain" : "text-blue-900"
          }  text-[46px] font-bold`}
        >
          {/* if (state) '성공' else '실패' */}
          {state ? "성공" : "실패"}
        </span>
      </h3>
      <span className={`text-white font-bold text-xl mt-[40px]`}>
        {children}
      </span>
      <BorderBtn href={href} ma="mt-[60px]">
        {btnText}
      </BorderBtn>
    </>
  );
}

export default function ModalStandard({
  modalbox,
  modaltitle,
  modaltext,
  closeposition,
  onClick,
  onClose,
}) {
  const { dimbg, flexcenter, stitle } = tail;

  // const [modalTextSate, setModalTextSate] = useState(true);

  return (
    <div className={`${dimbg}`}>
      <div className={`${modalbox}  ${flexcenter} flex-col relative`}>
        <h3 className={`${stitle} font-sans text-white mt-[80px]`}>
          {modaltitle}
        </h3>
        <span className={`text-white text-[16px] font-normal mt-[40px]`}>
          {modaltext}
        </span>
        <CloseBtn
          position={`${closeposition} top-0 right-0`}
          onClose={onClose}
        />
        <Btn
          btname="구매하기"
          width="w-[170px]"
          height="h-[60px]"
          ma="mt-[60px] mb-[60px]"
          fontsize="text-lg"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
