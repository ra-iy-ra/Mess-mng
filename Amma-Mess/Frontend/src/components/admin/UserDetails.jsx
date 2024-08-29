import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import { useParams } from 'react-router-dom';


const UserDetails = ({ match }) => {
  let params=useParams();
  const [students, setStudents] = useState([]);
  const clusterId = match.params.clusterId;

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cluster/${clusterId}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  }, [clusterId]);

  return (
    <div style={{ margin: '50px' }}>
      <h2>Students in Cluster</h2>
      <Table data={students} />
    </div>
  );
};

export default UserDetails;

