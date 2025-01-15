import { useEffect, useState } from 'react';

export default function RealTimeNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/socket');

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
