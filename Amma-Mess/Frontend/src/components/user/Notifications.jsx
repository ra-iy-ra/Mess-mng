import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/notifications');
        setNotifications(response.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            <strong>{notif.message}</strong>: {notif.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
