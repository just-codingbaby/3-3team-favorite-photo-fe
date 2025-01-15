import { useState, useEffect, useRef } from "react";
import { useUsersSalesCardsQuery } from "@/hooks/useUsers";
import CustomDropDown from "@/components/shared/CustomDropDown";
import SearchInput from "@/components/shared/SearchInput";
import Card from "@/components/mygallery/Card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider"; // React Context에서 로그인 유저 정보 가져오기
import Loading from "@/components/ui/loading";

// 1. 등급 : COMMON, RARE, SUPER RARE, LEGENDARY, default - none
const gradeOptions = [
  { value: "COMMON", label: "COMMON" },
  { value: "RARE", label: "RARE" },
  { value: "SUPER_RARE", label: "SUPER RARE" },
  { value: "LEGENDARY", label: "LEGENDARY" },
];

// 2. 장르 : 풍경, 인물, 동물, 정물, 추상, default - 미정
const genreOptions = [
  { value: "LANDSCAPE", label: "풍경" },
  { value: "PORTRAIT", label: "인물" },
  { value: "ANIMAL", label: "동물" },
  { value: "STILL_LIFE", label: "정물" },
  { value: "ABSTRACT", label: "추상" },
];

// 3. 판매방법: 판매 중, 교환 제시 대기 중, default - none
const saleMethodOptions = [
  { value: "selling", label: "판매 중" }, 
  { value: "panding", label: "교환 제시 대기 중" }];

// 4. 매진여부: 판매 중, 판매 완료, default - none
const saleOptions = [
  { value: "selling", label: "판매 중" }, 
  { value: "soldout", label: "판매 완료" }];

// 5. 정렬 옵션: 최신 순, 오래된 순, 높은 가격순, 낮은 가격순, default - 최신 순
const sortOptions = [
  { value: "recent", label: "최신 순" },
  { value: "old", label: "오래된 순" },
  { value: "high", label: "높은 가격순" },
  { value: "low", label: "낮은 가격순" },
];

export default function MySalesCard() {
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [inputValue, setInputValue] = useState(""); // 검색창 입력값 상태 관리
  const [params, setParams] = useState({
    sort: "recent",
    genre: "",
    sellout: false,
    grade: "",
    ownerId: 1, // ownerId: user?.id || null,
    pageNum: 1,
    pageSize: 9,
    keyword: "",
    cardStatus: "",
  });

  const [cards, setCards] = useState(""); // 카드 데이터 상태
  const [hasNextPage, setHasNextPage] = useState(false); // 추가 페이지 존재 여부
  const observerTarget = useRef(null); // 무한 스크롤 관찰 대상

  const { data, isLoading } = useUsersSalesCardsQuery(params); // 데이터 요청 쿼리 실행

  useEffect(() => {
    if (data) {
      setCards(data.data.shops); // 카드 데이터 업데이트
      setHasNextPage(data.data.shops.length >= params.pageSize); // 다음 페이지 여부 설정
    }
  }, [data]);

  const loadMoreCards = () => {
    if (!isLoading && hasNextPage) {
      setParams((prevParams) => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 6, // 페이지 크기 증가
      }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCards(); // 타겟이 보이면 추가 카드 로드
        }
      },
      { threshold: 1.0 } // 100% 보였을 때 트리거
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current); // 컴포넌트 해제 시 관찰 해제
    };
  }, [loadMoreCards]);

  if (isLoading && !cards)
    return (
      <div className="max-w-7xl mx-auto mt-6">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between border-b-2 border-gray-200 pb-4">
          <h1 className="text-4xl font-bold">나의 판매 포토카드</h1>
        </div>

        {/* 로딩 상태 */}
        <div className="mt-10 text-center">
          <Loading />
        </div>
      </div>
    );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams(() => ({
        keyword: inputValue,
        pageNum: 1,
      }));
    }
  };

  const handleClick = (e) => {
    setParams(() => ({
      keyword: inputValue,
      pageNum: 1,
    }));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 검색어 업데이트
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-6">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between border-b-2 border-gray-200 pb-4">
          <h1 className="text-4xl font-bold">나의 판매 포토카드</h1>
        </div>

        {/* 등급 정보 */}
        <div className="mt-8">
  <p className="text-xl font-bold">
    {user?.data?.nickname}님이 보유한 포토카드
    {data && (
      <span className="text-gray-400"> ({data.data.totalCount})</span>
    )}
  </p>
  <div className="flex gap-4 mt-4">
    {/* COMMON */}
    <div className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded">
      COMMON
      <span className="ml-2">        
        {data?.data.countsGroupByGrade.COMMON || 0} 장
      </span>
    </div>

    {/* RARE */}
    <div className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
      RARE
      <span className="ml-2">        
        {data?.data.countsGroupByGrade.RARE || 0} 장
      </span>
    </div>

    {/* SUPER RARE */}
    <div className="border border-purple-500 text-purple-500 px-4 py-2 rounded">
      SUPER RARE
      <span className="ml-2">        
        {data?.data.countsGroupByGrade.SUPER_RARE  || 0} 장
      </span>
    </div>

    {/* LEGENDARY */}
    <div className="border border-red-500 text-red-500 px-4 py-2 rounded">
      LEGENDARY
      <span className="ml-2">        
        {data?.data.countsGroupByGrade.LEGENDARY || 0} 장
      </span>
    </div>
  </div>
</div>

        {/* 검색 및 필터 */}
        <div className="flex items-center gap-6 mt-6 border-t border-gray-300 pt-6">
          <SearchInput
            placeholder="검색"
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            onChange={handleInputChange}
          />
          <CustomDropDown
          className="border border-gray-300 rounded px-3 py-2"
            label="등급"
            options={gradeOptions}
            setParams={setParams}
          />
          <CustomDropDown
          className="border border-gray-300 rounded px-3 py-2"
          label="장르"
          options={genreOptions}
          setParams={setParams}
          />
          <CustomDropDown
          className="border border-gray-300 rounded px-3 py-2"
            label="판매방법"
            options={saleMethodOptions}
            setParams={setParams}
          />
          <CustomDropDown
          className="border border-gray-300 rounded px-3 py-2"
            label="매진여부"
            options={saleOptions}
            setParams={setParams}
          />
        </div>

        {/* 카드 리스트 */}
        {cards && (
          <div className="grid grid-cols-3 gap-6 mt-10">
            {cards.map((card, index) => (
              <Link key={card.id} href={`/seller/photocard/${card.id}`}>
                <Card key={index} card={card} />
              </Link>
            ))}
          </div>
        )}

        {/* 추가 로딩 상태 */}
        {hasNextPage && (
          <div ref={observerTarget} className="mt-10 text-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
