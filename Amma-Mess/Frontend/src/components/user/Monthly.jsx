import React, { useState } from 'react';
import axios from 'axios';

const Monthly = () => {
  const [billGenerated, setBillGenerated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  const handleSelectMonthlyPlan = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      await axios.post('http://localhost:3001/api/generate-bill', 
        { planType: 'Monthly' }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json', 
          }
        }
      );

      setBillGenerated(true);
      alert('Successfully selected the Monthly Plan');
    } catch (err) {
      console.error('Error generating bill:', err);
      alert('Error generating bill. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2>MONTHLY COMBO</h2>
      <p>The amount to be paid is ₹3900. The discount is ₹600, so you only have to pay ₹3900. The menu of the monthly combo will be a repetition of the weekly menu.</p>
      <button 
        className={`btn ${billGenerated ? 'btn-success' : 'btn-warning'}`} 
        onClick={handleSelectMonthlyPlan}
      >
        Select Monthly Plan
      </button>
      {billGenerated && (
        <div>
          <h4>Bill</h4>
          <p>Meal Plan: Monthly Plan</p>
          <p>Amount to Pay: ₹3900</p>
        </div>
      )}
      <p>Payment Status: {paymentStatus}</p>
    </div>
  );
};

export default Monthly;