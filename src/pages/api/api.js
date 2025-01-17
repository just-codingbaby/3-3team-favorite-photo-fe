import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
  try {
    console.log("API_BASE_URL:", API_BASE_URL);

    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
    
  } catch (error) {
    console.error("로그인 실패:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const signUp = async (email, password, nickName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signUp`, {
      email,
      password,
      nickName,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};


export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/logout`, null, {
      withCredentials: true, // 쿠키 전송 활성화
    });
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};


// 보유한 카드목록 불러오기
  export async function getUsersMyCardList({sort, genre, sellout, grade, ownerId, pageNum, pageSize, keyword,}) {
    try {      
      console.log(' getUsersMyCardList API 요청 start');
      const response = await axios.get(`${API_BASE_URL}/api/v1/users/my-cards`, {
        // withCredentials: true, // 쿠키를 포함해 요청 전송
        params: { sort, genre, sellout, grade, ownerId, pageNum, pageSize, keyword},
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
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/my-cards/${id}`);
    
    return response.data;
  } catch (error) {
    console.error("getUsersMyCards 에러:", error.response?.data?.message || error.message);
    throw new Error("나의 카드 상세 조회 실패");
  }
}

// 상점에 등록한 나의 카드 목록 조회
export async function getUsersSalesCards({sort, genre, sellout, grade, ownerId, pageNum, pageSize, keyword, cardStatus,}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/my-cards/sales`, {
      params: { sort, genre, sellout, grade,ownerId, pageNum, pageSize, keyword, cardStatus, },
    });
    return response.data;
  } catch (error) {
    console.error("getUsersShop 에러:", error.response?.data?.message || error.message);
    throw new Error("상점에 등록한 나의 카드 목록 조회 실패");
  }
}