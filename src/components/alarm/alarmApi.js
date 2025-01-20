import axios from "axios";

// 알림 목록 가져오기
const fetchAlarms = async (userId) => {
  try {
    const response = await axios.get(`/api/notifications?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alarms:", error.response?.data?.message || error.message);
    throw error;
  }
};

// 새로운 알림 생성
const createAlarm = async (alarmData) => {
  try {
    const response = await axios.post("/api/notifications", alarmData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating alarm:", error.response?.data?.message || error.message);
    throw error;
  }
};

// 알림 읽음 상태 업데이트
const markAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(`/api/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error("Error marking alarm as read:", error.response?.data?.message || error.message);
    throw error;
  }
};

// 알림 삭제
const deleteAlarm = async (notificationId) => {
  try {
    const response = await axios.delete(`/api/notifications/${notificationId}`);
    return response.ok;
  } catch (error) {
    console.error("Error deleting alarm:", error.response?.data?.message || error.message);
    throw error;
  }
};

export { fetchAlarms, createAlarm, markAsRead, deleteAlarm };
