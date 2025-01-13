import { useState, useEffect, useRef } from "react";
import { useUsersMyCardListQuery } from "@/hooks/useUsers";
import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomDropDown from "@/components/shared/CustomDropDown";
import SearchInput from "@/components/shared/SearchInput";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import { useAuthStore } from "@/context/AuthProvider"; // React Context에서 로그인 유저 정보 가져오기
import Loading from "@/components/ui/loading";

// 등급 : COMMON, RARE, SUPER RARE, LEGENDARY, default - none
const gradeOptions = [
  { value: "COMMON", label: "COMMON" },
  { value: "RARE", label: "RARE" },
  { value: "SUPER_RARE", label: "SUPER RARE" },
  { value: "LEGENDARY", label: "LEGENDARY" },
];

// 장르 : 풍경, 인물, 동물, 정물, 추상, default - 미정
const genreOptions = [
  { value: "LANDSCAPE", label: "LANDSCAPE" },
  { value: "PORTRAIT", label: "PORTRAIT" },
  { value: "ANIMAL", label: "ANIMAL" },
  { value: "STILL_LIFE", label: "STILL_LIFE" },
  { value: "ABSTRACT", label: "ABSTRACT" },
];


export default function Mygallery() {
  const { user } = useAuthStore(); // 현재 로그인된 사용자 정보 가져오기
  const [inputValue, setInputValue] = useState(""); // 검색창 입력 상태
  const [params, setParams] = useState({
    genre: "",
    grade: "",
    pageNum: 1,
    pageSize: 9,
    keyword: "",
  }); // API 요청 상태


  const [cards, setCards] = useState([]); // 카드 데이터를 저장
  const [hasNextPage, setHasNextPage] = useState(false); // 다음 페이지 여부 확인
  const observerTarget = useRef(null); // 무한 스크롤 관찰 대상

  // 사용자 카드 목록을 가져온다
  const { data, isLoading, error } = useUsersMyCardListQuery({
    ...params,
    user,
  });

  // 데이터가 변경되면 카드 목록과 페이지 상태 업데이트
  useEffect(() => {
    if (data) {
      setCards(data.data.cards); // 카드 데이터 업데이트
      setHasNextPage(data.data.cards.length >= params.pageSize); // 다음 페이지 여부 설정
    }
  }, [data]);

  const loadMoreCards = () => {
    if (!isLoading && hasNextPage) {
      setParams((prevParams) => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 6,
      }));
    }
  };

  // 무한 스크롤 관찰자 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCards(); // 타겟이 보이면 추가 카드 로드
        }
      },
      { threshold: 1.0 } // 타겟이 100% 보일 때 트리거
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current); // 컴포넌트 해제 시 관찰 해제
    };
  }, [loadMoreCards]);


  if (error)
    return <div className="text-red-500">Error: {error.message}</div>;
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams({ keyword: inputValue, pageNum: 1 });
    }
  };

  // 검색 버튼 클릭 처리
  const handleClick = () => {
    setParams({ keyword: inputValue, pageNum: 1 });
  };

  // 검색 입력값 변경 처리
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 포인트 업데이트 (테스트용 버튼)
  const handleUpdatePoints = () => {
    const newPoints = user?.data.point + 500 || 500; // 기존 포인트에 500 추가
    updatePoints(newPoints); // 포인트 업데이트
  };
/*
<button
  onClick={handleUpdatePoints}
  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
>
  포인트 추가 (+500)
</button>
*/


  if (isLoading && !cards.length) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">마이갤러리</h1>
        <Loading />
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error.message}</div>;


  return (
    <div className="bg-[#1a1a1a] min-h-screen p-6">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto flex justify-between items-center border-b-2 border-gray-200 pb-5">
        <h1 className="text-4xl font-bold text-white">마이갤러리</h1>
        <Link href="/mygallery/createcard">
                <div className="flex flex-col gap-5 px-5 py-5 w-[500px]">                  
                  <PrimaryButton
                    label="포토카드 생성하기"
                    width="440px"
                    height="80px"
                    textSize="xl"
                    textColor='text-black'
                  />
                  </div>
        </Link>
      </div>

      {/* 카드 등급 및 총합 */}
      <div className="mt-10 max-w-7xl mx-auto">
        <p className="text-lg font-bold text-white">
          {user?.data?.nickname ? (
              `${user.data.nickname}님이 보유한 포토카드`
            ) : (
              "사용자 데이터를 불러오는 중입니다..."
            )}
            {data ? (
              <span className="text-blue-500 font-normal">
                ({data.data.totalCount || 0})
              </span>
            ) : null}        
        </p>
        {/* 등급 정보 */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="border border-blue-500 text-blue-500 p-2 rounded text-center">
            COMMON
            <span className="block text-sm mt-1">
              {data?.data.countsGroupByGrade[0] || 0} 장
            </span>
          </div>
          <div className="border border-green-500 text-green-500 p-2 rounded text-center">
            RARE
            <span className="block text-sm mt-1">
              {data?.data.countsGroupByGrade[1] || 0} 장
            </span>
          </div>
          <div className="border border-purple-500 text-purple-500 p-2 rounded text-center">
            SUPER RARE
            <span className="block text-sm mt-1">
              {data?.data.countsGroupByGrade[2] || 0} 장
            </span>
          </div>
          <div className="border border-red-500 text-red-500 p-2 rounded text-center">
            LEGENDARY
            <span className="block text-sm mt-1">
              {data?.data.countsGroupByGrade[3] || 0} 장
            </span>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="max-w-7xl mx-auto mt-10 flex gap-6 border-t border-gray-400 pt-5">
        <SearchInput          
          placeholder="검색"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
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
      </div>

      {/* 카드 목록 */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link key={card.id} href={`/mygallery/${card.id}`}>
            <Card card={card} />
          </Link>
        ))}
      </div>

      {/* 로딩 스피너 */}
      {hasNextPage && (
        <div ref={observerTarget} className="flex justify-center mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
}
