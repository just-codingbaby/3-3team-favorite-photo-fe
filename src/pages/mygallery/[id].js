import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUsersMyCardsQuery } from "@/hooks/useUsers";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Loading from "@/components/ui/loading";

export default function MyCardDetail() {
  const [showMyGallery, setShowMyGallery] = useState(false); // 갤러리 모달 상태
  const [sellMyCard, setSellMyCard] = useState(false); // 판매 모달 상태
  const router = useRouter(); // 라우터 객체
  const { id } = router.query; // URL 파라미터에서 카드 ID 가져오기

  // 임시 데이터
  const data = {
    data: {
      id: "123", // 카드 ID
      name: "빛나는 전설 카드", // 카드 이름
      image: "/images/card/img_default-Landscape.webp", // 이미지 경로 (프로젝트 내 public 디렉토리에 추가 필요)
      genre: "풍경", // 카드 장르
      grade: "Legendary", // 카드 등급
      nickname: "유저123", // 사용자 닉네임
      description: "이 카드는 전설적인 빛을 발하는 특별한 카드입니다.", // 카드 설명
      price: 1500, // 카드 가격 (포인트)
      quantity: 3, // 보유 카드 수량
    },
  };
  

  const { res_data, isLoading, error } = useUsersMyCardsQuery({
    id, // 카드 ID를 기반으로 데이터 쿼리
    enabled: !!id, // ID가 존재할 때만 쿼리 활성화
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">Error: {error.message}</div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white">
        {/* 카드 상세 제목 */}
        <h1 className="text-3xl font-bold mb-8">{data?.data.name}</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 카드 이미지 */}
          <Image
            src={data?.data.image}
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
              {data?.data.grade || "등급 없음"}
            </span>
            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded">
              {data?.data.genre || "장르 없음"}
            </span>
              <span className="text-xl font-semibold">
                {data?.data.nickname}
              </span>
            </div>

            {/* 카드 설명 */}
            <p className="mb-6 text-gray-300">{data?.data.description}</p>

            {/* 카드 가격 및 보유량 */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">가격:</span>
                <span className="text-green-400 font-bold">
                  {data?.data.price} P
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">보유량:</span>
                <span className="text-blue-400 font-bold">
                  {data?.data.quantity} 장
                </span>
              </div>
            </div>

            {/* 판매하기 버튼 */}
            <PrimaryButton
              label="포토카드 판매하기"
              width="440px"
              height="80px"
              textSize="xl"
              textColor='text-black'              
            />
          </div>
        </div>
      </div>

    </>
  );
}
