import tail from "@/styles/tailwindcss";
import { Btn } from "./buyer";

export function CloseBtn({ position }) {
  return (
    <button
      className={`absolute ${position} bg-transparent border-[1px] border-transparent cursor-pointer`}
    >
      <span class="absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
      <span class="absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
    </button>
  );
}

export default function ModalStandard({ rating, title, buyphoto = "2" }) {
  const { dimbg, flexcenter } = tail;
  return (
    <div className={`${dimbg}`}>
      <div
        className={`relative w-[560px] h-[352px] bg-[#161616] ${flexcenter} flex-col`}
      >
        <CloseBtn position="top-[30px] right-[30px] w-8 h-8" />
        <h3 className={`text-xl font-bold text-white mt-[80px]`}>
          포토카드 구매
        </h3>
        <span className={`text-customGrey01 mt-[40px]`}>
          [{rating} | {title}] {buyphoto}장을 구매하시겠습니까?
        </span>
        <Btn
          btname="구매하기"
          width="w-[170px]"
          height="h-[60px]"
          ma="mt-[60px] mb-[60px]"
          fontsize="text-lg"
        />
      </div>
    </div>
  );
}

// export function SuccessModal(){
//     return(

//     )
// }
