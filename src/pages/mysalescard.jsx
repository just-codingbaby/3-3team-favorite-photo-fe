import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/contexts/AuthProvider'; // React Context에서 로그인 유저 정보 가져오기
import Link from 'next/link';

import { useUsersSalesCardsQuery } from '@/hooks/useUsers';

import Card from '@/components/mygallery/Card';
import CustomDropDown from '@/components/shared/CustomDropDown';
import SearchInput from '@/components/shared/SearchInput';
import Loading from '@/components/ui/loading';

// 등급 : COMMON, RARE, SUPER RARE, LEGENDARY
const gradeOptions = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER_RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

// 장르 : 여행, 풍경, 인물, 사물
const genreOptions = [
  { value: 'TRAVEL', label: '여행' },
  { value: 'LANDSCAPE', label: '풍경' },
  { value: 'PORTRAIT', label: '인물' },
  { value: 'OBJECT', label: '사물' },
];

// 판매방법: 판매 중, 교환 제시 대기 중
const saleMethodOptions = [
  { value: 'AVAILABLE', label: '판매 중' },
  { value: 'IN_TRADE', label: '교환 제시 대기 중' },
];

// 4. 매진여부: 판매 중, 판매 완료
const selloutOptions = [
  { value: false, label: '매진 아님' },
  { value: true, label: '매진됨' },
];

// 정렬 옵션: 최신 순, 오래된 순, 높은 가격순, 낮은 가격순, default - 최신 순
const sortOptions = [
  { value: 'recent', label: '최신 순' },
  { value: 'old', label: '오래된 순' },
  { value: 'high', label: '높은 가격순' },
  { value: 'low', label: '낮은 가격순' },
];

// enum CardStatus {
//   AVAILABLE 판매중
//   IN_TRADE 교환대기중
//   SOLD_OUT 판매완료
// }

export default function MySalesCard() {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 상태 관리
  const [params, setParams] = useState({
    sort: 'recent',
    genre: '',
    sellout: false, // 매진 여부
    grade: '',
    ownerId: null,
    pageNum: 1,
    pageSize: 9,
    keyword: '',
    cardStatus: '', // 판매중, 교환대기중, 판매완료
  });

  useEffect(() => {
    if (user?.id) {
      setParams((prev) => ({ ...prev, ownerId: user.id }));
      if (process.env.NODE_ENV === 'development') {
        console.log('현재 params:', params);
      }
    }
  }, [user, params]);

  const [cards, setCards] = useState([]); // 카드 데이터를 저장
  const [hasNextPage, setHasNextPage] = useState(false); // 다음 페이지 존재 여부
  const observerTarget = useRef(null); // 무한 스크롤 관찰 대상

  const { data, isLoading, error } = useUsersSalesCardsQuery({
    ...params,
  });

  useEffect(() => {
    if (user && data?.data?.cards) {
      setCards(data.data.cards);
      setHasNextPage(data.data.cards.length >= params.pageSize);

      if (process.env.NODE_ENV === 'development') {
        console.log(data.data.cards);
      }
    }
  }, [data, params.pageSize, user]);

  const loadMoreCards = () => {
    if (!isLoading && hasNextPage) {
      setParams((prevParams) => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 6,
      }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCards();
        }
      },
      { threshold: 1.0 },
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [loadMoreCards]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setParams((prev) => ({
        ...prev,
        keyword: inputValue,
        pageNum: 1,
      }));
    }
  };

  const handleClick = () => {
    setParams((prev) => ({
      ...prev,
      keyword: inputValue,
      pageNum: 1,
    }));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  if (isLoading && !cards) {
    return (
      <div className="mx-auto mt-6 max-w-7xl">
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
  }

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <>
      <div className="mx-auto mt-6 max-w-7xl">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between border-b-2 border-gray-200 pb-4">
          <h1 className="text-4xl font-bold">나의 판매 포토카드</h1>
        </div>

        {/* 등급 정보 */}
        <div className="mt-8">
          <p className="text-xl font-bold">
            {user?.nickName
              ? `${user.nickName}님이 판매 중인 포토카드`
              : '사용자 데이터를 불러오는 중입니다...'}
            {data && <span className="text-gray-400"> ({data.data.totalCount})</span>}
          </p>
          <div className="mt-4 flex gap-4">
            {/* COMMON */}
            <div className="rounded border border-yellow-500 px-4 py-2 text-yellow-500">
              COMMON
              <span className="ml-2">{data?.data?.countsGroupByGrade?.COMMON || 0} 장</span>
            </div>

            {/* RARE */}
            <div className="rounded border border-blue-500 px-4 py-2 text-blue-500">
              RARE
              <span className="ml-2">{data?.data?.countsGroupByGrade?.RARE || 0} 장</span>
            </div>

            {/* SUPER RARE */}
            <div className="rounded border border-purple-500 px-4 py-2 text-purple-500">
              SUPER RARE
              <span className="ml-2">{data?.data?.countsGroupByGrade?.SUPER_RARE || 0} 장</span>
            </div>

            {/* LEGENDARY */}
            <div className="rounded border border-red-500 px-4 py-2 text-red-500">
              LEGENDARY
              <span className="ml-2">{data?.data?.countsGroupByGrade?.LEGENDARY || 0} 장</span>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="mt-6 flex items-center gap-6 border-t border-gray-300 pt-6">
          <SearchInput
            placeholder="검색"
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            onChange={handleInputChange}
          />
          <CustomDropDown
            className="rounded border border-gray-300 px-3 py-2"
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
            className="rounded border border-gray-300 px-3 py-2"
            label="장르"
            options={genreOptions}
            value={params.genre}
            onChange={(value) =>
              setParams((prev) => ({
                ...prev,
                genre: value,
              }))
            }
          />
          <CustomDropDown
            className="rounded border border-gray-300 px-3 py-2"
            label="판매방법"
            options={saleMethodOptions}
            value={params.cardStatus}
            onChange={(value) =>
              setParams((prev) => ({
                ...prev,
                cardStatus: value,
              }))
            }
          />
          <CustomDropDown
            className="rounded border border-gray-300 px-3 py-2"
            label="매진여부"
            options={selloutOptions}
            value={params.sellout}
            onChange={(value) =>
              setParams((prev) => ({
                ...prev,
                sellout: value,
              }))
            }
          />
        </div>

        {/* 카드 리스트 */}
        {cards && (
          <div className="mt-10 grid grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Link key={card.id} href={`/market/${card.id}`}>
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