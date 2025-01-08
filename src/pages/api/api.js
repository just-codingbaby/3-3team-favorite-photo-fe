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
      const api = renderApi();
      const response = await api.get("/users/my-cards", {
        params: {
          sort,
          genre,
          sellout,
          grade,
          ownerId,
          pageNum,
          pageSize,
          keyword,
        },
      });
      return response;
    } catch (error) {
      setError(error.response.data.message, "/");
      throw error;
    }
  }
  