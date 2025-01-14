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


export const logout = (req, res) => {
  try {
    // 쿠키 삭제
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });

    return res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.error("로그아웃 실패:", error);
    return res.status(500).json({ message: "로그아웃 실패" });
  }
};
