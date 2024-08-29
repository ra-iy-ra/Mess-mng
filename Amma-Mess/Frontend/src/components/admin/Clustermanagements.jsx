import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../../styles/Clustermanagement.css'

const Clustermanagement = () => {
  const [clusters, setClusters] = useState([]);
  const [newCluster, setNewCluster] = useState('');

  useEffect(() => {
    axios.get('/api/clusters')
      .then(response => setClusters(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddCluster = () => {
    axios.post('/api/clusters', { name: newCluster })
      .then(response => {
        setClusters([...clusters, response.data]);
        setNewCluster('');
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
      <ul>
        {clusters.map(cluster => (
          <li key={cluster._id}>{cluster.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clustermanagement;
