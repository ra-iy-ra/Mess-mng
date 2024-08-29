import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bills', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBills(response.data);
        updateTotalAmount(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const updateTotalAmount = (bills) => {
    const total = bills.reduce((sum, bill) => sum + (bill.status !== 'Cancelled' ? bill.amount : 0), 0);
    setTotalAmount(total);
  };

  const handleCancelDay = async (billId) => {
    try {
      await axios.post(`http://localhost:3001/api/cancel-day/${billId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const updatedBills = bills.map(bill =>
        bill._id === billId ? { ...bill, status: 'Cancelled' ,selectedMeals: { breakfast: false, lunch: false, dinner: false } } : bill
      );
      setBills(updatedBills);
      updateTotalAmount(updatedBills);
    } catch (error) {
      console.error('Error cancelling day:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Bill History</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill._id}>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>
                {bill.selectedMeals.breakfast ? 'Bf ' : ''}
                {bill.selectedMeals.lunch ? 'L ' : ''}
                {bill.selectedMeals.dinner ? 'D ' : ''}
              </td>
              <td>
                ₹{bill.amount}
                {bill.selectedMeals.breakfast && bill.selectedMeals.lunch && bill.selectedMeals.dinner ? 
                 <span className="text-success"> (₹20 discount applied)</span> 
                 : ''}
              </td>
              <td>{bill.status}</td>
              <td>
                {bill.status !== 'Cancelled' && (
                  <button 
                    className='btn btn-danger' 
                    onClick={() => handleCancelDay(bill._id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td></td>
            <td><strong>₹{totalAmount}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
