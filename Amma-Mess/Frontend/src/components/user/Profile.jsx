import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img5 from '../../assets/default-profile-picture1.jpg'

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    cluster: '',
    planType: '',
    planEndDate: '',
    dateOfRegistration:''
  });
  

  // useEffect(() => {
  //   // const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

        
  //   if (!userId) {
  //     console.error('No userId found');
  //     return;
  //   }

  //   axios.get(`http://localhost:3001/api/auth/user-profile?userId=${userId}`)
  //     .then(response => setUser(response.data))
  //     .catch(err => console.log('Error fetching user profile:', err));
  // }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: { Authorization:` Bearer ${token}` },
        });

        setUser({
          name: response.data.name,
          cluster: response.data.cluster,
          planType: response.data.planType,
          planEndDate: response.data.planEndDate,
          dateOfRegistration: response.data.dateOfRegistration
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load profile data.');
      }
    };

    fetchProfile();
  }, []);

  // if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <img
          src={img5}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: '150px', height: '150px' }}
        />
        <h3 className="card-title">{user.name}</h3>
        <p className="text-muted">{user.cluster.name}</p>
        <p className="text-muted">Registered on: {new Date(user.dateOfRegistration).toLocaleDateString()}</p>
        <p><strong>Plan Type:</strong> {user.planType || 'No plan selected'}</p>
        <p><strong>Plan End Date:</strong> {user.planEndDate ? new Date(user.planEndDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  </div>
);
};

export default Profile;
