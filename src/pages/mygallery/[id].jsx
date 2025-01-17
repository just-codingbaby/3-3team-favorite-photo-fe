import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUsersMyCardsQuery } from "@/hooks/useUsers";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useAuth } from "@/contexts/AuthProvider";
import Loading from "@/components/ui/loading";

export default function MyCardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [isSellModalOpen, setSellModalOpen] = useState(false); // '포토카드 판매하기' 모달 상태

  const { data, isLoading, error } = useUsersMyCardsQuery({
    id, // 카드 ID를 기반으로 데이터 쿼리
    enabled: Boolean(id),  // ID가 존재할 때만 쿼리 활성화
  });

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-300">카드 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log('API 응답 데이터:', data);
    console.log('로딩 상태:', isLoading);
    console.log('에러 정보:', error);
    console.log('id:', id);
    console.log('user.nickName:', user?.nickName);
  }
  
  const cardData = data || {};

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loading />
        <p className="text-gray-300 mt-4">카드 정보를 불러오는 중입니다...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">        
        <p>카드 정보를 불러오는 데 실패했습니다.</p>
        <p>에러 메시지: {error.message}</p>
      </div>
    );


// 판매 모달 열기
const openSellModal = () => {
  setSellModalOpen(true);
};

// 판매 모달 닫기
const closeSellModal = () => {
  setSellModalOpen(false);
};

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white">
        {/* 카드 상세 제목 */}
        <h1 className="text-3xl font-bold mb-8">{cardData?.name || "카드 제목 없음"}</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 카드 이미지 */}
          <Image
            src={cardData?.imgUrl}
            width={960}
            height={720}
            alt="card-image"
            className="rounded-lg"
          />

          {/* 카드 정보 섹션 */}
          <div className="flex flex-col flex-grow">
            {/* 카드 등급 및 사용자 닉네임 */}
            <div className="flex items-center gap-4 mb-4">

            <span className="px-3 py-1 bg-gray-800 text-white rounded">
              {cardData?.grade || "등급 없음"}
            </span>
            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded">
              {cardData?.genre || "장르 없음"}
            </span>
              <span className="text-xl font-semibold">
                {user?.nickName}
              </span>
            </div>

            {/* 카드 설명 */}
            <p className="mb-6 text-gray-300">{cardData?.description}</p>

            {/* 카드 가격 및 보유량 */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">가격:</span>
                <span className="text-green-400 font-bold">
                  {cardData?.price} P
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">보유량:</span>
                <span className="text-blue-400 font-bold">
                  {cardData?.totalQuantity} 장
                </span>
              </div>
            </div>

            {/* 판매하기 버튼 */}
            <PrimaryButton
              label="포토카드 판매하기"
              width="440px"
              height="80px"
              textSize="xl"
              onClick={openSellModal} // 버튼 클릭 시 모달 열기              
            />
          </div>
        </div>
      </div>
      {/* 판매 모달 */}
    </>
  );
}
