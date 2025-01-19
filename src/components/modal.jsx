import { useState } from 'react';

import tail from '@/styles/tailwindcss';
import { useRouter } from 'next/router';

import { Title } from '@/components/shared/Title';

import PrimaryButton from './shared/PrimaryButton';
import SecondaryButton from './shared/SecondaryButton';

export function CloseBtn({ position, onClose }) {
  const closeBtn = `absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2`;
  return (
    <button
      className={`absolute ${position} cursor-pointer border-[1px] border-transparent bg-transparent`}
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
      <div className={`${modalbox} ${flexcenter} relative flex-col`}>
        <h3 className={`${stitle} mt-[80px] font-sans text-white`}>{modaltitle}</h3>
        <span className={`mt-[40px] text-[16px] font-normal text-white`}>{modaltext}</span>
        <CloseBtn position={`${closeposition} top-[46px] right-[46px]`} onClose={onClose} />
        {children}
      </div>
    </div>
  );
}

// 포토카드 교환하기 모달 창
export function ModalExchange({ modalbox, children, onClick, onClose, className }) {
  const { dimbg } = tail;

  return (
    <div className={`${dimbg} ${className} bg-opacity-80`} onClick={onClick}>
      <div className={`${modalbox} relative mx-auto border border-white bg-[#161616]`}>
        <CloseBtn position="top-[150px] right-[180px] absolute" onClose={onClose} />
        <div className={`mx-auto max-w-[920px] bg-[#161616]`}>{children}</div>
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
          className={`mt-[40px] h-[600px] w-[440px] border border-white`}
          // onClose={onClose}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <SecondaryButton
            label="취소하기"
            width="210px"
            height="60px"
            textSize="lg"
            handleClick={onClick}
          />
        </Ex>
      )}
    </div>
  );
}

// 임시로 만든거 여기에 지연님 포토카드 컴포넌트 넣을꺼임
export function Ex({ className, handleClick, children }) {
  const { flexcenter } = tail;
  return (
    <div className={`${className} ${flexcenter} flex-col`} onClick={handleClick}>
      <div>img</div>
      <div>text</div>
      {children}
    </div>
  );
}

export function ExchangeDetail({ onClose, xBtn, children, title, onClick }) {
  const router = useRouter();
  const { flexstanderd } = tail;

  // const handleButtonClick = (e) => {
  //   if (e === '교환하기') {
  //     console.log('눌리냐?');
  //     router.push({
  //       pathname: '/ModalPage',
  //       query: {
  //         type: '교환 제시',
  //         rating: 'COMMON',
  //         title: '스페인에서',
  //         quantity: 4,
  //       },
  //     });
  //   } else {
  //     console.log('동작 없음');
  //   }
  // };

  return (
    <div>
      <ModalExchange
        className="!bg-opacity-0"
        modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
        //  onClick={}
        onClose={xBtn}
      >
        <Title location="포토카드 교환하기" title={title} className="mb-[20px]" />
        <div className={`mt-[20px] flex justify-between`}>
          {children}
          {/* <Ex className={`h-[600px] w-[440px] border border-white`} /> */}
          <div className={`flex w-full max-w-[440px] flex-col`}>
            <h3 className="mb-[10px] text-xl font-bold">교환 제시 내용</h3>
            <div>
              <textarea
                className="h-[120px] w-full border border-white bg-transparent px-5 py-5 text-[16px] font-light"
                placeholder="내용을 입력해 주세요"
              />
            </div>
            <div className={` ${flexstanderd} mt-[60px] justify-between`}>
              <SecondaryButton
                label="취소하기"
                width="210px"
                height="60px"
                textSize="lg"
                handleClick={onClose}
              />
              <PrimaryButton
                label="교환하기"
                width="210px"
                height="60px"
                textSize="lg"
                handleClick={onClick}
              />
            </div>
          </div>
        </div>
      </ModalExchange>
    </div>
  );
}
