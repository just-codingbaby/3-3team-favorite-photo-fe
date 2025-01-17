import { useState } from 'react';

import tail from '@/styles/tailwindcss';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Buyer, { Btn, Gradetitle } from '@/components/buyer';
import { ModalExchange } from '@/components/modal';

export function Title({ location, title, className }) {
  const { marketlogo, titles, afborder } = tail;
  return (
    <div className={`${className}`}>
      <div className={`${marketlogo}`}>{location}</div>
      <h2 className={`${titles} ${afborder} text-white`}>{title}</h2>
    </div>
  );
}

export default function CardDetailPage() {
  const { header, titles, afborder, pointtext, flexstanderd, btnabsol } = tail;
  const router = useRouter();

  const [example, setExample] = useState({
    title: '우리집 앞마당',
    rating: 'LEGENDARY',
    buyphoto: 2,
  });

  const [modal, setModal] = useState(false);

  function modalHandle() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <div>
      <div className={`mx-auto w-full max-w-[1480px] tablet:max-w-[704px]`}>
        <Title location="마켓플레이스" title={example.title} />
        <div className={`mt-[60px] flex justify-between tablet:mt-[40px]`}>
          <div
            className={`relative h-[720px] w-full max-w-[960px] overflow-hidden tablet:h-[256px] tablet:max-w-[342px]`}
          >
            <Image
              width={960}
              height={720}
              src="/images/type=sample_img1.png"
              alt="우리집 앞마당 포토카드 이미지"
              className={`absolute object-cover tb:h-[256px] tb:w-[342px]`}
              priority
            />
          </div>
          <Buyer
            nickname="미쓰손"
            content="우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. "
            price="4"
            buyphoto="2"
            totalphoto="5"
          />
        </div>
        <div className={`${flexstanderd} relative`}>
          <h2 className={`${titles} ${afborder} mt-[120px] w-full text-white`}>교환 희망 정보</h2>
          <Btn
            btname="포토카드 교환하기"
            className="mt-[120px] h-[60px] w-[440px] text-lg text-[#0F0F0F]"
            absolute={btnabsol}
            onClick={modalHandle}
          />
          {modal && (
            <ModalExchange
              modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
              onClose={handleCloseModal} // 모달 닫기 함수 전달
            >
              123
            </ModalExchange>
          )}
        </div>
        <p className={`mt-[60px] text-white ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 나중에 뚫어야할
          부분임
        </p>
        <Gradetitle rating="RARE" type="풍경" mt="mt-[20px]" />
      </div>
    </div>
  );
}