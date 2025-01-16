import { useRouter } from "next/router";
import Image from "next/image";
import CardInfo from "./CardInfo"; // 등급 및 장르를 표시하는 컴포넌트
import { useEffect, useState } from "react";

export default function Card({ onClick, card, quantity }) {
  const [isSelling, setIsSelling] = useState(false); // 판매 상태
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (card.sellout) {
      setIsSelling(true); // 매진 상태 설정
    }
  }, [card.sellout]);

  const isInMyGallery = pathname.includes("/mygallery");

  return (
    <div
      className={`w-[440px] h-[600px] bg-gray-1000 p-10 relative text-white border border-gray-700 hover:cursor-pointer`} // 카드 컨테이너 스타일
      onClick={onClick}
    >
      {/* 카드 이미지 */}
      <Image
        src={card.imgUrl}
        className="block w-[360px] h-[270px]"
        width={360}
        height={270}
        alt="card-image"
        priority
      />

      {/* 매진 상태 */}
      {!isInMyGallery && isSelling && (
        <div className="absolute top-10 right-10 w-[360px] h-[270px] bg-black/30 flex justify-center items-center z-10">
          <Image
            src="/sellout-icon.svg"
            width={230}
            height={230}
            alt="sellout-img"
          />
        </div>
      )}

      {/* 판매 상태 */}
      {pathname === "/mysales" && (
        <div
          className={`absolute top-12 left-12 px-4 py-1 bg-black/50 text-sm ${
            card.cardStatus ? "text-main" : "text-white"
          }`}
        >
          {card.cardStatus ? "교환 제시 대기 중" : "판매 중"}
        </div>
      )}

      {/* 카드 정보 */}
      <div className="border-b border-gray-400 pb-5 mt-5">
        <p className="text-xl font-bold mt-5">{card.name}</p>
        <div className="flex justify-between items-center mt-2">
          <CardInfo style="small" grade={card.grade} genre={card.genre} />
          <p className="underline text-sm">카드생성자 이름</p>
          {/* <p className="underline text-sm">{card.creatorNickname}</p> */}
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="flex justify-between mt-5">
        <p className="text-gray-300">가격</p>
        <p className="text-lg font-normal">{card.price} P</p>
      </div>

      {/* 수량 정보 */}
      <div className="flex justify-between mt-2">
        <p className="text-gray-300">{quantity ? "수량" : "잔여"}</p>
        <p className="text-lg font-normal">
          {quantity ? (
            card.remainingQuantity
          ) : (
            card.remainingQuantity
          )} 

          {/* {quantity ? (
            card.quantity
          ) : (
            <>
              {isInMyGallery ? card.quantity : card.remainingQuantity}
              {!isInMyGallery && (
                <span className="text-gray-300">/ {card.totalQuantity}</span>
              )}
            </>
          )}  */}
        </p>
      </div>

      {/* 로고 */}
      <Image
        src="/images/main_logo.png"        
        width={99.25}
        height={18}
        alt="logo"
        className="block mx-auto mt-10"
      />
    </div>
  );
}
