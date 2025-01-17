import { useEffect, useState } from "react";

export default function RealTimeNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3000/api/socket");

    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      if (newNotification.userId === userId) {
        setNotifications((prev) => [newNotification, ...prev]);
      }
    };

    return () => socket.close();
  }, [userId]);

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <small>{timeAgo(notification.created_at)}</small>
        </div>
      ))}
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
