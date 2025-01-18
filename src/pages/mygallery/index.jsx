import { useState, useEffect, useRef } from "react";
import { useUsersMyCardListQuery } from "@/hooks/useUsers";
import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomDropDown from "@/components/shared/CustomDropDown";
import SearchInput from "@/components/shared/SearchInput";
import Card from "@/components/mygallery/Card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider"; // React Context에서 로그인 유저 정보 가져오기
import Loading from "@/components/ui/loading";

// 등급 : COMMON, RARE, SUPER RARE, LEGENDARY
const gradeOptions = [
  { value: "COMMON", label: "COMMON" },
  { value: "RARE", label: "RARE" },
  { value: "SUPER_RARE", label: "SUPER RARE" },
  { value: "LEGENDARY", label: "LEGENDARY" },
];

// 장르 : 여행, 풍경, 인물, 사물
const genreOptions = [
  { value: "TRAVEL", label: "여행" },
  { value: "LANDSCAPE", label: "풍경" },
  { value: "PORTRAIT", label: "인물" },  
  { value: "OBJECT", label: "사물" },
];

export default function MyGallery() {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState(""); // 검색창 입력값 상태 관리
  const [params, setParams] = useState({
    genre: "",
    grade: "",    
    ownerId: null,
    pageNum: 1,
    pageSize: 9,
    keyword: "",
  });

  useEffect(() => {
    if (user) {
      setParams((prev) => ({ ...prev, ownerId: user.id }));
      if (process.env.NODE_ENV === "development") {
        console.log("MyGallery 현재 params:", params);
      }    
    }
  }, [user]);
  
  

  const [cards, setCards] = useState([]); // 카드 데이터를 저장
  const [hasNextPage, setHasNextPage] = useState(false); // 다음 페이지 여부 확인
  const observerTarget = useRef(null); // 무한 스크롤 관찰 대상

  const { data, isLoading, error } = useUsersMyCardListQuery({
    ...params,
    user,
  });

  // 데이터가 변경되면 카드 목록과 페이지 상태 업데이트
  useEffect(() => {
    if (data?.data?.cards) {
      setCards(data.data.cards); // 카드 데이터 업데이트
      setHasNextPage(data.data.cards.length >= params.pageSize); // 다음 페이지 여부 설정

      if (process.env.NODE_ENV === "development") {
        console.log(data.data.cards); 
      }      
    }
  }, [data]);

  const loadMoreCards = () => {
    if (!isLoading && hasNextPage) {
      setParams((prevParams) => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 6,  // 페이지 크기 증가
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
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams((prev) => ({
        ...prev,
        keyword: inputValue, // 입력된 검색어로 params.keyword 업데이트
        pageNum: 1, // 페이지를 초기화
      }));
    }
  };
    
  // 검색 버튼을 클릭했을 때 호출
  const handleClick = () => {
    setParams((prev) => ({
      ...prev,
      keyword: inputValue, // 입력된 검색어로 params.keyword 업데이트
      pageNum: 1, // 페이지를 초기화
    }));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 검색창 입력값 업데이트
  };

  if (isLoading && !cards.length) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">마이갤러리</h1>
        <Loading />
      </div>
    );
  }

  if (error) 
    return <div className="text-red-500">Error: {error.message}</div>;


  return (
    <div className="bg-[#1a1a1a] min-h-screen p-6">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto flex justify-between items-center border-b-2 border-gray-200 pb-5">
        <h1 className="text-4xl font-bold text-white">마이갤러리</h1>
        <Link href="/makePhotoCard">
                <div className="flex flex-col gap-5 px-5 py-5 w-[500px]">                  
                  <PrimaryButton
                    label="포토카드 생성하기"
                    width="440px"
                    height="80px"
                    textSize="xl"                    
                  />
                  </div>
        </Link>
      </div>

      {/* 카드 등급 및 총합 */}
      <div className="mt-10 max-w-7xl mx-auto">
        <p className="text-lg font-bold text-white">
        {/* // {console.log("user:", user)} */}
          {user?.nickName ? (
              `${user.nickName}님이 보유한 포토카드`
            ) : (
              "사용자 데이터를 불러오는 중입니다..."
            )}
            {data?.data?.totalCount !== undefined ? (
              <span className="text-gray-300 font-normal">
                ({data.data.totalCount || 0}장)
              </span>
            ) : null}        
        </p>
        {/* 등급 정보 */}
        <div className="flex gap-4 mt-4">
          <div className="border border-yellow-500 text-yellow-500 px-4 py-2  rounded text-center">
            COMMON
            <span className="ml-2">
            {data?.data?.countsGroupByGrade?.COMMON || 0} 장
            </span>
          </div>
          <div className="border border-blue-500 text-blue-500 px-4 py-2 rounded text-center">
            RARE
            <span className="ml-2">
            {data?.data?.countsGroupByGrade?.RARE || 0} 장
            </span>
          </div>
          <div className="border border-purple-500 text-purple-500 px-4 py-2 rounded text-center">
            SUPER RARE
            <span className="ml-2">
            {data?.data?.countsGroupByGrade?.SUPER_RARE || 0} 장
            </span>
          </div>
          <div className="border border-red-500 text-red-500 px-4 py-2 rounded text-center">
            LEGENDARY
            <span className="ml-2">
            {data?.data?.countsGroupByGrade?.LEGENDARY || 0} 장
            </span>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="max-w-7xl mx-auto mt-10 flex gap-6 border-t border-gray-400 pt-5">
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
          value={params.grade} 
          onChange={(value) =>
            setParams((prev) => ({
              ...prev,
              grade: value,
            }))
          }
        />
        <CustomDropDown
          className="border border-gray-300 rounded px-3 py-2"
          label="장르"
          options={genreOptions}
          value={params.genre} // params에서 선택된 값 가져오기
          onChange={(value) =>
            setParams((prev) => ({
              ...prev,
              genre: value, // 선택된 장르 값을 params.genre에 반영
            }))
          }
        />
      </div>

      {/* 카드 목록 */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link key={card.id} href={`/mygallery/${card.id}`}>
            <Card card={card}  quantity={card.remainingQuantity} />
            {/* 총 발행 갯수, 팔리고 남은 갯수, 나의 카드 갯수(내가 사고, 만들고, 교환하고 해서 현재 가지고 있는 카드의 갯수) */}
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