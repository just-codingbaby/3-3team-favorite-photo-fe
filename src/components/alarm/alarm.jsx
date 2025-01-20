import { useEffect, useState } from 'react';

import axios from 'axios';

export default function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotifications() {
      if (!userId) {
        console.error('userId가 없습니다.');
        return;
      }

      try {
        console.log('userId:', userId); // userId 확인
        const response = await axios.get(`/api/notifications?userId=${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('API 호출 오류:', error.response || error); // error.response로 세부 사항 출력
        setError('알림을 불러오는 데 실패했습니다.');
      }
    }
    fetchNotifications();
  }, [userId]);

  return (
    <div className="absolute right-0 top-14 h-[535px] w-[300px] overflow-y-auto rounded-lg bg-gray-800 text-white shadow-lg">
      {error && <p className="p-4 text-center text-red-500">{error}</p>}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="border-b border-gray-700 p-4 last:border-none">
            <p className="text-left text-sm font-normal leading-[20.27px]">
              {notification.message}
            </p>
            <small className="mt-1 block text-xs font-light leading-[17.38px] text-gray-400">
              {timeAgo(notification.created_at)}
            </small>
          </div>
        ))
      ) : (
        <p className="p-4 text-center text-gray-400">알림이 없습니다.</p>
      )}
    </div>
  );
}

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
