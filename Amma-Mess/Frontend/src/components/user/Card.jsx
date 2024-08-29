import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from '../../assets/breakfast.png';
import img2 from '../../assets/lunch.jpeg';
import img3 from '../../assets/dinner.jpeg';

const Card = () => {
  const [menu, setMenu] = useState({ breakfast: '', lunch: '', dinner: '' });
  const [selectedMeals, setSelectedMeals] = useState({ breakfast: false, lunch: false, dinner: false });

  useEffect(() => {
    axios.get('http://localhost:3001/api/menu/today')
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error('Error fetching today\'s menu:', error);
      });

     
    const fetchSelectedMeals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/get-selected-meals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectedMeals(response.data.selectedMeals);
      } catch (error) {
        console.error('Error fetching selected meals:', error);
      }
    };

    fetchSelectedMeals();
  }, []);

  const handleSelectMeal = async (mealType) => {
    try {
      const token = localStorage.getItem('token');
      
      
      const response = await axios.post(`http://localhost:3001/api/generate-single-meal-bill`, 
        { mealType }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const billId = response.data._id; 

      
      await axios.post(`http://localhost:3001/api/select-meal/${billId}`, { mealType }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSelectedMeals((prevSelectedMeals) => ({
        ...prevSelectedMeals,
        [mealType]: true,
      }));
    } catch (error) {
      console.error('Error selecting meal:', error);
    }
  };

  const handleCancelMeal = async (mealType) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/cancel-meal', { mealType }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Meal cancellation has been notified to the admin.');
      setSelectedMeals((prevSelectedMeals) => ({
        ...prevSelectedMeals,
        [mealType]: false,
      }));
    } catch (error) {
      console.error('Error cancelling meal:', error);
    }
  };

  return (
    <div style={{ display: 'flex', margin: 100, justifyContent: 'space-between' }}>
      <div className="card" style={{ width: '18rem' }}>
        <img src={img1} className="card-img-top" alt="..." style={{ height: '100px', width: '206px', paddingLeft: '57px' }} />
        <div className="card-body" style={{ marginTop: '35px' }}>
          <h5 className="card-title">Breakfast</h5>
          <p className="card-text">{menu.breakfast}</p>
          <h6>Rs.40</h6>
          <button 
            className={`btn ${selectedMeals.breakfast ? 'btn-success' : 'btn-primary'}`} 
            onClick={() => handleSelectMeal('breakfast')}
            disabled={selectedMeals.breakfast}
          >
            {selectedMeals.breakfast ? 'Selected' : 'Select'}
          </button>
          <a href="#" className="btn btn-primary" onClick={() => handleCancelMeal('breakfast')}>Cancel</a>
        </div>
      </div>

      <div className="card" style={{ width: '18rem' }}>
        <img src={img2} className="card-img-top" alt="..." style={{ height: '100px', width: '206px', paddingLeft: '57px' }} />
        <div className="card-body" style={{ marginTop: '35px' }}>
          <h5 className="card-title">Lunch</h5>
          <p className="card-text">{menu.lunch}</p>
          <h6>Rs.70</h6>
          <button 
            className={`btn ${selectedMeals.lunch ? 'btn-success' : 'btn-primary'}`} 
            onClick={() => handleSelectMeal('lunch')}
            disabled={selectedMeals.lunch}
          >
            {selectedMeals.lunch ? 'Selected' : 'Select'}
          </button>
          <a href="#" className="btn btn-primary" onClick={() => handleCancelMeal('lunch')}>Cancel</a>
        </div>
      </div>

      <div className="card" style={{ width: '18rem' }}>
        <img src={img3} className="card-img-top" alt="..." style={{ height: '100px', width: '206px', paddingLeft: '57px' }} />
        <div className="card-body" style={{ marginTop: '35px' }}>
          <h5 className="card-title">Dinner</h5>
          <p className="card-text">{menu.dinner}</p>
          <h6>Rs.40</h6>
          <button 
            className={`btn ${selectedMeals.dinner ? 'btn-success' : 'btn-primary'}`} 
            onClick={() => handleSelectMeal('dinner')}
            disabled={selectedMeals.dinner}
          >
            {selectedMeals.dinner ? 'Selected' : 'Select'}
          </button>
          <a href="#" className="btn btn-primary" onClick={() => handleCancelMeal('dinner')}>Cancel</a>
        </div>
      </div>
    </div>
  );
};

export default Card;

