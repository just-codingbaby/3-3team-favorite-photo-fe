import axios from "@/lib/axios";

// 보유한 카드목록 불러오기  
  export async function getUsersMyCardList({sort, genre, grade, ownerId, pageNum, pageSize, keyword,}) {
    try {      
      const response = await axios.get("/api/v1/users/my-cards", {
        params: { sort, genre, grade, ownerId, pageNum, pageSize, keyword},
      });
      return response.data;
    } catch (error) {
      console.error('getUsersMyCardList 에러:', error.response?.data?.message || error.message);
      throw new Error('나의 카드 목록 불러오기 실패');
    }
  }
    

// 보유한 포토카드 카드상세 조회
export async function getUsersMyCards({ id }) {
  try {    
    const response = await axios.get(`/api/v1/users/my-cards/${id}`);    
    return response.data;
  } catch (error) {
    console.error("getUsersMyCards 에러:", error.response?.data?.message || error.message);
    throw new Error("나의 카드 상세 조회 실패");
  }
}

// 상점에 등록한 나의 카드 목록 조회
export async function getUsersSalesCards({sort, genre, sellout, grade, ownerId, pageNum, pageSize, keyword, cardStatus,}) {
  try {
    const response = await axios.get(`/api/v1/users/my-cards/sales`, {
      params: { sort, genre, sellout, grade,ownerId, pageNum, pageSize, keyword, cardStatus, },
    });
    return response.data;
  } catch (error) {
    console.error("getUsersShop 에러:", error.response?.data?.message || error.message);
    throw new Error("상점에 등록한 나의 카드 목록 조회 실패");
  }
}