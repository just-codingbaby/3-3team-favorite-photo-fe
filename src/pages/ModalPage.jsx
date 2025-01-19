import { useState } from 'react';

import tail from '@/styles/tailwindcss';
import { useRouter } from 'next/router';

import { BorderBtn, CloseBtn, ExchangeDetail } from '@/components/modal';
import SecondaryButton from '@/components/shared/SecondaryButton';

// 구매/교환제시 성공,실패
export default function ModalPage({ onClose, text, state, children }) {
  //실험
  const router = useRouter();
  const { type, rating, title, quantity, id } = router.query; // 쿼리에서 데이터 가져오기
  const { dimbg, flexcenter } = tail;

  // 단일 상태로 성공/실패 및 타입 관리
  const [modalState, setModalState] = useState({
    type: type, // "구매" 또는 "교환 제시"
    success: true, // 성공 여부
  });

  // 메시지 생성 함수
  const getMessage = () => {
    if (modalState.type === '구매') {
      return modalState.success
        ? `[ ${rating} | ${title} ] ${quantity}장 구매에 성공했습니다!`
        : `[ ${rating} | ${title} ] ${quantity}장 구매에 실패했습니다!`;
    } else if (modalState.type === '교환 제시') {
      return modalState.success
        ? `포토카드 교환 제시에 성공했습니다!`
        : `포토카드 교환 제시에 실패했습니다!`;
    }
    return '';
  };

  // 버튼 텍스트 생성 함수
  const getButtonText = () => {
    if (modalState.type === '구매' && modalState.success) {
      return '마이갤러리에서 확인하기';
    } else if (modalState.type === '구매' || modalState.success) {
      return '마켓플레이스로 돌아가기';
    } else if (modalState.type === '교환 제시' && modalState.success) {
      return '나의 판매 포토카드에서 확인하기';
    } else if (modalState.type === '교환 제시' && modalState.success) {
      return '마켓플레이스로 돌아가기';
    }
  };

  // 닫기 버튼 핸들러
  const handleClose = () => {
    if (modalState.success) {
      router.push(`/market/${id}`); // 성공 시 마이갤러리로 이동
      // router.back();
    } else {
      router.push(modalState.type === '구매' ? '/buyphoto' : '/buyphoto'); // 실패 시 마켓플레이스 또는 교환 페이지로 이동
    }
  };

  return (
    <div className={`${dimbg} bg-opacity-100`}>
      <div className={`${flexcenter} relative h-[352px] w-[560px] flex-col`}>
        {/* 닫기 버튼 */}
        <CloseBtn position={`top-0 right-0`} onClose={handleClose} />

        {/* 성공/실패 제목 */}
        <h3 className={`mt-[80px] font-baskin text-xl font-bold text-white`}>
          <span className="mr-[10px] text-[46px] font-bold text-white">{modalState.type}</span>
          <span
            className={`${
              modalState.success ? 'text-customMain' : 'text-customGrey01'
            } text-[46px] font-bold`}
          >
            {modalState.success ? '성공' : '실패'} {/* 성공 또는 실패 */}
          </span>
        </h3>

        {/* 메시지 텍스트 */}
        <span className={`mt-[40px] text-xl font-bold text-white`}>
          {getMessage()} {/* 동적 메시지 출력 */}
        </span>
        <SecondaryButton
          label={getButtonText()}
          width="440px"
          height="60px"
          textSize="lg"
          className="mt-[60px]"
        />
      </div>
    </div>
  );
}
