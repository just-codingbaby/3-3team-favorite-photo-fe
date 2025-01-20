// 구매수량 부분
import tail from '@/styles/tailwindcss';

export default function DetailQuantityBtn({ buyphoto, ClickBuyphoto, totalQuantity }) {
  const { flexstanderd, flexcenter } = tail;
  const plusicon = 'absolute inset-0 bg-black m-auto bg-white';
  console.log(buyphoto);

  return (
    <div className={`${flexstanderd} w-full justify-between`}>
      <span className={`text-xl font-normal text-white`}>구매수량</span>
      <div className={`h-[50px] w-[176px] border border-white ${flexcenter}`}>
        <div className={` ${flexstanderd} mx-[12px] gap-[46px]`}>
          <button
            className={`h-[1px] w-[12px] bg-white`}
            // onClick={() => setNum((prev) => Math.max(0, prev - 1))}
            onClick={() => ClickBuyphoto((prev) => Math.max(0, prev - 1))}
          ></button>
          <span className={`text-xl font-normal text-white`}>{buyphoto}</span>
          <button
            className={`relative h-[12px] w-[12px]`}
            // onClick={() => setNum((prev) => prev + 1)}
            onClick={() => {
              ClickBuyphoto((prev) => {
                if (totalQuantity === prev) {
                  alert('최대치입니다.');
                  return prev;
                }
                return prev + 1;
              });
            }}
          >
            <div className={`${plusicon} h-full w-[2px]`}></div>
            <div className={`${plusicon} h-[2px] w-full`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}