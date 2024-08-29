import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [clusters, setClusters] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0); 

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/clusters')
  //     .then(response => setClusters(response.data))
  //     .catch(error => console.error(error));

  //   axios.get('http://localhost:3001/api/auth/users')
  //     .then(response => setUserCount(response.data.length))
  //     .catch(error => console.error(error));
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage

    axios.get('http://localhost:3001/api/clusters', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setClusters(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:3001/api/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setUserCount(response.data.length))
      .catch(error => console.error(error));

    axios.get('http://localhost:3001/api/alert', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setAlertCount(response.data.length))
      .catch(error => console.error(error));

  }, []);

  const data = [
    { name: 'Monday', bf: 4, lu: 2, di: 2 },
    { name: 'Tuesday', bf: 3, lu: 1, di: 2 },
    { name: 'Wednesday', bf: 2, lu: 1, di: 2 },
    { name: 'Thursday', bf: 2, lu: 3, di: 2 },
    { name: 'Saturday', bf: 1, lu: 4, di: 2 },
    { name: 'Sunday', bf: 2, lu: 3, di: 2 },
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='cards'>
          <div className='card-inner'>
            <h3>MENU</h3>
            <a className="nav-link" href="/menu"><BsFillArchiveFill className='card_icon' /></a>
          </div>
        </div>

        {/* <a href='/clusters'> */}
          <div className='cards'>
            <div className='card-inner'>
              <h3>CLUSTERS</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>{clusters.length}</h1>
          </div>
        {/* </a> */}
        
        
        <div className='cards'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{userCount}</h1>
        </div>

        <div className='cards'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <a className="nav-link" href="/alert"><BsFillBellFill className='card_icon' /></a>
          </div>
          <h1>{alertCount}</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bf" fill="#8884d8" />
            <Bar dataKey="lu" fill="#82ca9d" />
            <Bar dataKey="di" fill="#0A5853" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bf" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="lu" stroke="#82ca9d" />
            <Line type="monotone" dataKey="di" stroke="#0A5853" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Dashboard;
