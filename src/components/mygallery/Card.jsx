import { useEffect, useState } from 'react';

import soldOutImg from '@/public/images/type=soldout.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CardInfo from './CardInfo'; // 등급 및 장르를 표시하는 컴포넌트

// 이 컴포넌트는 현재 myGallery 와 mysalescard에서 사용한다.
export default function Card({ onClick, card, quantity }) {
  const [isSelling, setIsSelling] = useState(false); // 판매 상태
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (card.sellout) {
      setIsSelling(true); // 매진 상태 설정
    }
  }, [card.sellout]);

  const isInMyGallery = pathname.includes('/mygallery');

  return (
    <div
      className={`bg-gray-1000 relative h-[600px] w-[440px] border border-gray-700 p-10 text-white hover:cursor-pointer`} // 카드 컨테이너 스타일
      onClick={onClick}
    >
      {/* 카드 이미지 */}
      <Image
        src={card.imgUrl}
        className="block h-[270px] w-[360px]"
        width={360}
        height={270}
        alt="card-image"
        priority
      />

      {/* 매진 상태 */}
      {!isInMyGallery && isSelling && (
        <div className="absolute right-10 top-10 z-10 flex h-[270px] w-[360px] items-center justify-center bg-black/30">
          <Image src={soldOutImg} width={230} height={230} alt="sellout-img" />
        </div>
      )}

      {/* 판매 상태 */}
      {pathname === '/mysalescard' && (
        <div
          className={`absolute left-12 top-12 bg-black/50 px-4 py-1 text-sm ${
            card.status === 'IN_TRADE'
              ? 'text-main'
              : card.status === 'SOLD_OUT'
                ? 'text-gray-400'
                : 'text-white'
          }`}
        >
          {card.status === 'AVAILABLE' && '판매 중'}
          {card.status === 'IN_TRADE' && '교환 제시 대기 중'}
          {card.status === 'SOLD_OUT' && '거래 완료'}
        </div>
      )}

      {/* 카드 정보 */}
      <div className="mt-5 border-b border-gray-400 pb-5">
        <p className="mt-5 text-xl font-bold">{card.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <CardInfo style="small" grade={card.grade} genre={card.genre} />
          <p className="text-sm underline">낭만 고양이</p>
          {/* <p className="text-sm underline">{card.creator.nickName}</p> */}
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="mt-5 flex justify-between">
        <p className="text-gray-300">가격</p>
        <p className="text-lg font-normal">{card.price} P</p>
      </div>

      {/* 수량 정보 */}
      <div className="mt-2 flex justify-between">
        <p className="text-gray-300">{pathname === '/mygallery' ? '잔여' : '수량'}</p>
        <p className="text-lg font-normal">
          {pathname === '/mygallery' ? (
            card.remainingQuantity
          ) : (
            <>
              {card.totalQuantity - card.remainingQuantity}{' '}
              <span className="text-gray-300">/ {card.totalQuantity}</span>
            </>
          )}
        </p>
      </div>

      {/* 로고 */}
      <Image
        src="/images/main_logo.png"
        width={99.25}
        height={18}
        alt="logo"
        className="mx-auto mt-10 block"
      />
    </div>
  );
}
