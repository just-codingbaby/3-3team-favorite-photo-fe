import { useQuery } from "@tanstack/react-query"; 
import {getUsersMyCardList, getUsersMyCards, getUsersSalesCards} from "@/pages/api/api";
import { QUERY_KEYS } from "@/lib/queryKeys";

// 보유한 카드목록
  export function useUsersMyCardListQuery({sort, genre, grade, ownerId, pageNum, pageSize, keyword,  user, }) {
    return useQuery({
      queryKey: [
        QUERY_KEYS.USERS_MY_CARD_LIST,
        sort,
        genre,        
        grade,        
        ownerId,
        pageNum,
        pageSize,
        keyword || "",
      ],
      queryFn: () =>
        getUsersMyCardList({ sort, genre, grade,ownerId, pageNum, pageSize, keyword, }),
      enabled: Boolean(user && ownerId), // 조건이 충족될 때만 실행
      keepPreviousData: true,
    });
  }
  
  // 카드상세 조회
export function useUsersMyCardsQuery({ id }) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS_MY_CARDS, id],
    queryFn: () => getUsersMyCards({ id }),
    keepPreviousData: true,
    enabled: !!id,
    retry: 1, // 실패시 1회 재시도
    onError: (error) => {
      console.error("카드 상세 조회 실패:", error.message);
    },
  });
}

// 내가 상점에 등록한 포토 카드 목록 조회
export function useUsersSalesCardsQuery({ sort, genre, sellout, grade, ownerId, pageNum, pageSize, keyword, cardStatus, }) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.USERS_MY_CARDS_SALES,
      sort,
      genre,
      sellout,
      grade,
      ownerId,
      pageNum,
      pageSize,
      keyword,
      cardStatus,
    ],
    queryFn: () =>
      getUsersSalesCards({ sort, genre, sellout, grade,ownerId, pageNum, pageSize, keyword, cardStatus, }),
    keepPreviousData: true,
    enabled: !!ownerId, // ownerId가 있을 때만 실행
    retry: 1,
    onError: (error) => {
      console.error("상점에 등록한 나의 카드 목록 조회 실패:", error.message);
    },
  });
}
