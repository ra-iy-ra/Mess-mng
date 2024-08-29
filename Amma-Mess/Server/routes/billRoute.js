const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const authenticate = require('../Middleware/authentication'); 
const alert = require('../models/alert');
//const User = require ('../models/User');


// Generate Bill
router.post('/generate-bill', authenticate, async (req, res) => {
  const { planType } = req.body;
  const userId = req.user.id; 

  if (!planType || !userId) {
    return res.status(400).json({ message: 'Invalid request. PlanType or User ID missing.' });
  }

  try {
    const today = new Date();
    const startDate = today;
    const endDate = new Date(today);
 

    const dailyCost = 130;
    const days = planType === 'Weekly' ? 7 : 30;
    endDate.setDate(today.getDate() + days - 1);

    const bills = [];

    for (let i = 0; i < days; i++) {
      const billDate = new Date(today);
      billDate.setDate(today.getDate() + i);


    const newBill = new Bill({
      user: userId,
      planType,
      startDate,
      endDate,
      date: billDate,
      amount: dailyCost,
      totalAmount: dailyCost,
      selectedMeals: { breakfast: true, lunch: true, dinner: true }, 
      status: 'Active'
    });

    bills.push(newBill);
    }


    await Bill.insertMany(bills);
    res.status(201).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//User Bill History
router.get('/bills', authenticate, async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Payment Status
router.post('/pay-bill/:billId', authenticate, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.paymentStatus = 'Paid';
    bill.paymentDate = new Date();

    await bill.save();
    res.json({ message: 'Payment successful', bill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Cancel and update  bill status  
// router.post('/cancel-day/:id', authenticate, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const bill = await Bill.findById(req.params.id);
//     if (!bill) return res.status(404).send('Bill not found');
    
//     bill.status = 'Cancelled';
//     await bill.save();

    
//     const notification = new alert({
//       userId: userId,
//       message: `User ${req.user.name} has cancelled their meal for ${bill.date}`,
//       type: 'meal_cancellation',
//       date: new Date(),
//   });

//   await notification.save();
    
//   res.json({ message: 'Meal cancelled and notification sent', bill });
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

// Cancel all meals for the day
router.post('/cancel-day/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).send('Bill not found');

   
    bill.status = 'Cancelled';
    bill.selectedMeals = { breakfast: false, lunch: false, dinner: false }; 
    await bill.save();

    
    const notification = new alert({
      userId: userId,
      message: `User ${req.user.name} has cancelled their meals for ${bill.date}`,
      type: 'meal_cancellation',
      date: new Date(),
    });

    await notification.save();
    
    res.json({ message: 'All meals cancelled and notification sent', bill });
  } catch (error) {
    res.status(500).send('Server error');
  }
});




// single-meal selection
router.post('/select-meal/:billId', authenticate, async (req, res) => {
  const { mealType } = req.body;
  const { billId } = req.params;

  try {
    const bill = await Bill.findById(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (mealType === 'breakfast') bill.selectedMeals.breakfast = true;
    if (mealType === 'lunch') bill.selectedMeals.lunch = true;
    if (mealType === 'dinner') bill.selectedMeals.dinner = true;

    const mealCosts = {
      breakfast: 40,
      lunch: 70,
      dinner: 40,
    };

    bill.amount = (bill.selectedMeals.breakfast ? mealCosts.breakfast : 0) +
                  (bill.selectedMeals.lunch ? mealCosts.lunch : 0) +
                  (bill.selectedMeals.dinner ? mealCosts.dinner : 0);

    
    if (bill.selectedMeals.breakfast && bill.selectedMeals.lunch && bill.selectedMeals.dinner) {
      bill.amount -= 20; 
    }

    bill.totalAmount = bill.amount;
    
    bill.status = 'Active';
    await bill.save();
    res.json({ message: 'Meal selected', bill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// generate-bill for single-meal
router.post('/generate-single-meal-bill', authenticate, async (req, res) => {
  const { mealType } = req.body;
  const userId = req.user.id;

  if (!mealType || !userId) {
    return res.status(400).json({ message: 'Invalid request. Meal type or User ID missing.' });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    let bill = await Bill.findOne({ user: userId, date: today });

    const mealCosts = {
      breakfast: 40,
      lunch: 70,
      dinner: 40,
    };

    if (bill) {
      
      if (mealType === 'breakfast') bill.selectedMeals.breakfast = true;
      if (mealType === 'lunch') bill.selectedMeals.lunch = true;
      if (mealType === 'dinner') bill.selectedMeals.dinner = true;

      
      bill.amount = (bill.selectedMeals.breakfast ? mealCosts.breakfast : 0) +
                    (bill.selectedMeals.lunch ? mealCosts.lunch : 0) +
                    (bill.selectedMeals.dinner ? mealCosts.dinner : 0);

      
      if (bill.selectedMeals.breakfast && bill.selectedMeals.lunch && bill.selectedMeals.dinner) {
        bill.amount -= 20; 
      }

      bill.totalAmount = bill.amount;
    } else {
      
      bill = new Bill({
        user: userId,
        planType: 'Single Meal',
        date: today,
        amount: mealCosts[mealType],
        totalAmount: mealCosts[mealType],
        selectedMeals: {
          breakfast: mealType === 'breakfast',
          lunch: mealType === 'lunch',
          dinner: mealType === 'dinner',
        },
      });
    }

    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  get selected meals for today
router.get('/get-selected-meals', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    
    const bill = await Bill.findOne({ user: userId, date: today });

    if (!bill) {
      return res.json({ selectedMeals: { breakfast: false, lunch: false, dinner: false } });
    }

    
    res.json({ selectedMeals: bill.selectedMeals });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching selected meals', error: err.message });
  }
});






module.exports = router;