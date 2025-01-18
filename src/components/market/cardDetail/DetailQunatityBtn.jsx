// 구매수량 부분
import tail from "@/styles/tailwindcss";

export default function DetailQunatityBtn({buyphoto, ClickBuyphoto}) {
  const {flexstanderd, flexcenter} = tail;
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