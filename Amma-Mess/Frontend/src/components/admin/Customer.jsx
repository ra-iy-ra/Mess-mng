import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Table.css';

const Customer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="contain-table" style={{ margin: '50px' }}>
      <h1>TODAYS CUSTOMERS</h1>
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.cluster ? user.cluster.name : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No customers today</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
