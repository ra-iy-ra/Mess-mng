import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Cluster = () => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/clusters')
      .then(response => setClusters(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '50px' }}>
      {clusters.length > 0 ? (
        clusters.map(cluster => (
          <div className="card" style={{ width: '18rem' }} key={cluster._id}>
            <div className="card-body">
              <h5 className="card-title">{cluster.name}</h5>
              <Link to={`/clusters/${cluster._id}/users`} className="btn btn-primary">Show Details</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No clusters available</p>
      )}

      <Link to='/clustermanagement' className='d-grid gap-2'>
        <Button size='lg'>Create</Button>
      </Link>
    </div>
  );
}; 

export default Cluster;
