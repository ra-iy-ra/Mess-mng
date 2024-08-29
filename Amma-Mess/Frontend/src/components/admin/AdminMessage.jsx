import React, { useState } from 'react';
import axios from 'axios';

function AdminMessage() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message) {
      try {
        await axios.post('http://localhost:3001/api/admin/send-message', { message });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    } else {
      alert('Please select a message to send.');
    }
  };

  return (
    <div className="message-container">
      <h2>Send Message to All Users</h2>
      <select value={message} onChange={(e) => setMessage(e.target.value)}>
        <option value="">Select a message</option>
        <option value="meal is ready">Meal is Ready</option>
        <option value="meal is going to finish">Meal is Going to Finish</option>
        <option value="meal is finished">Meal is Finished</option>
      </select>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default AdminMessage;
