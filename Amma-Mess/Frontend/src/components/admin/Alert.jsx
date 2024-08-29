import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage
                const response = await axios.get('http://localhost:3001/api/alert'
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
            });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h1>Alerts</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        {notification.message} - {new Date(notification.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
