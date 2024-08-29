import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Table = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/clusters/${id}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div style={{ margin: '50px' }}>
      <h2>Cluster Users</h2>
      {users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
             <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found in this cluster.</p>
      )}
    </div>
  );
};

export default Table;
