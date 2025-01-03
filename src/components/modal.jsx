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

export function BorderBtn({ text, ma }) {
  const { flexcenter } = tail;

  return (
    <div
      className={`${flexcenter} ${ma} w-[440px] h-[60px] border border-white`}
    >
      <span className={`text-lg text-white font-medium`}>{text}</span>
    </div>
  );
}

export default function ModalStandard({
  modalbox,
  modaltitle,
  modaltext,
  modaltextClass,
  rating,
  title,
  buyphoto,
  btn,
  closeposition,
}) {
  const { dimbg, flexcenter } = tail;
  return (
    <div className={`${dimbg}`}>
      <div className={`${modalbox}  ${flexcenter} flex-col`}>
        <CloseBtn position={`${closeposition}`} />
        <h3 className={`text-xl font-bold text-white mt-[80px]`}>
          {modaltitle}
        </h3>
        <span className={`${modaltextClass} mt-[40px]`}>{modaltext}</span>
        {btn}
      </div>
    </div>
  );
}

// export function SuccessModal(){
//     return(

//     )
// }
