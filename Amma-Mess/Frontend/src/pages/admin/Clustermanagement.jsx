import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Clustermanagement = () => {
  const [clusters, setClusters] = useState([]);
  const [newCluster, setNewCluster] = useState('');
  let history=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/clusters')
      .then(response => setClusters(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddCluster = () => {
    axios.post('http://localhost:3001/api/clusters', { name: newCluster })
      .then(response => {
        setClusters([...clusters, response.data]);
        setNewCluster('');
        history('/clusters')
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Cluster Management</h2>
      <input 
        type="text" 
        value={newCluster} 
        onChange={(e) => setNewCluster(e.target.value)} 
        placeholder="New cluster name" 
      />
      <button onClick={handleAddCluster}>Add Cluster</button>
      {/* <ul>
        {clusters.map(cluster => (
          <li key={cluster._id}>{cluster.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Clustermanagement;
