import { useEffect, useState } from "react";

export default function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch(`/api/notifications?userId=${userId}`);
      const data = await response.json();
      setNotifications(data);
    }
    fetchNotifications();
  }, [userId]);

  return (
    <div className="absolute top-14 right-0 w-[300px] h-[535px] bg-gray-800 text-white shadow-lg rounded-lg overflow-y-auto">
      {/* 알림 전체 박스 */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-700 last:border-none"
          >
            <p className="text-sm font-normal leading-[20.27px] text-left">
              {notification.message}
            </p>
            <small className="text-xs font-light leading-[17.38px] text-gray-400 mt-1 block">
              {timeAgo(notification.created_at)}
            </small>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 p-4">알림이 없습니다.</p>
      )}
    </div>
  );
}

// 시간 포맷 유틸리티
function timeAgo(date) {
  const now = new Date();
  const diff = (now - new Date(date)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}주 전`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}개월 전`;
  return `${Math.floor(diff / 31536000)}년 전`;
}
