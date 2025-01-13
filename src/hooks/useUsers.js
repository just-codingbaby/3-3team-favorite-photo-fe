import { useQuery } from "@tanstack/react-query"; 
import {getUsersMyCardList, getUsersMyCards} from "@/pages/api/api";
import { QUERY_KEYS } from "@/lib/queryKeys";

// 보유한 카드목록
  export function useUsersMyCardListQuery({
    sort,
    genre,
    sellout,
    grade,
    ownerId,
    pageNum,
    pageSize,
    keyword,
    user,
  }) {
    return useQuery({
      queryKey: [
        QUERY_KEYS.USERS_MY_CARD_LIST,
        sort,
        genre,
        sellout,
        grade,
        ownerId,
        pageNum,
        pageSize,
        keyword || "",
      ],
      queryFn: () =>
        getUsersMyCardList({
          sort,
          genre,
          sellout,
          grade,
          ownerId,
          pageNum,
          pageSize,
          keyword,
        }),
      enabled: !!user, // user가 존재할 때만 쿼리 실행
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
    retry: false,
  });
}
