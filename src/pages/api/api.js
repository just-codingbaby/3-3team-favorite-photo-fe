const API_URL = "https://three-3team-favorite-photo-be.onrender.com";

// 보유한 카드목록
export async function getUsersMyCardList({
    sort,
    genre,
    sellout,
    grade,
    ownerId,
    pageNum,
    pageSize,
    keyword,
  }) {
    try {
      console.log(`/users/my-cards`);
      const response = null;    
      return response;
    } catch (error) {
      setError(error.response.data.message, "/");
      throw error;
    }
  }
  

// 보유한 포토 카드 카드상세 조회
export async function getUsersMyCards({ id }) {
  try {
    console.log(`/users/my-cards/${id}`);
    const response = null;    
    return response;
  } catch (error) {
    setError(error.response.data.message, "back");
    throw error;
  }
}

  