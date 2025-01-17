import axios from "axios";

// 알림 목록 가져오기
const fetchAlarms = async (userId) => {
  try {
    const response = await fetch(`/api/notifications?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch alarms");
    return await response.json();
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

// 새로운 알림 생성
const createAlarm = async (alarmData) => {
  try {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alarmData),
    });
    if (!response.ok) throw new Error("Failed to create alarm");
    return await response.json();
  } catch (error) {
    console.error("Error creating alarm:", error);
    throw error;
  }
};

// 알림 읽음 상태 업데이트
const markAsRead = async (notificationId) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to mark alarm as read");
    return await response.json();
  } catch (error) {
    console.error("Error marking alarm as read:", error);
    throw error;
  }
};

// 알림 삭제
const deleteAlarm = async (notificationId) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete alarm");
    return response.ok;
  } catch (error) {
    console.error("Error deleting alarm:", error);
    throw error;
  }
};

export { fetchAlarms, createAlarm, markAsRead, deleteAlarm };
