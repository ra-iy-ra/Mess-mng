const express = require('express');
const router = express.Router();
const Alert = require('../models/alert');
const authenticate = require('../Middleware/authentication'); 
const User = require('../models/User');
const Cluster = require('../models/Cluster');
const Bill = require('../models/bill');

// Fetch all notifications for the admin
router.get('/alert',authenticate, async (req, res) => {
    try {
        const notifications = await Alert.find({}).sort({ date: -1 });
        console.log('Fetched notifications:', notifications);
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// router.post('/cancel-meal', authenticate, async (req, res) => {
//     const { mealType } = req.body;
//     const userId = req.user.id;
  
//     if (!mealType || !userId ) {
//       return res.status(400).json({ message: 'Invalid request. Meal type or User ID missing.' });
//     }
  
//     try {
        
//     const user = await User.findById(userId);
//     const cluster = await Cluster.findById(user.cluster);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

    
      
//       const alert = new Alert({
//         userId: userId,
//         message: `User: ${user.name} of Cluster: ${cluster.name}, Meal cancelled: ${mealType}`,
//         type: 'single_meal_cancellation',
//       });
  
//       await alert.save();
//       res.status(200).json({ message: 'Meal cancellation notified to admin' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });



// Cancel a meal and adjust the bill
router.post('/cancel-meal', authenticate, async (req, res) => {
    const { mealType } = req.body;
    const userId = req.user.id;
  
    if (!mealType || !userId ) {
      return res.status(400).json({ message: 'Invalid request. Meal type or User ID missing.' });
    }
  
    try {
        const user = await User.findById(userId);
        const cluster = await Cluster.findById(user.cluster);
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        let bill = await Bill.findOne({ user: userId, date: today });

        if (!bill) {
          return res.status(404).json({ message: 'No bill found for today' });
        }

        
        bill.selectedMeals[mealType] = false;

        const mealCosts = {
          breakfast: 40,
          lunch: 70,
          dinner: 40,
        };

       
        bill.amount = (bill.selectedMeals.breakfast ? mealCosts.breakfast : 0) +
                      (bill.selectedMeals.lunch ? mealCosts.lunch : 0) +
                      (bill.selectedMeals.dinner ? mealCosts.dinner : 0);

        
        if (!(bill.selectedMeals.breakfast && bill.selectedMeals.lunch && bill.selectedMeals.dinner)) {
          bill.amount = bill.amount; 
        }

        bill.totalAmount = bill.amount;

        await bill.save();

       
        const alert = new Alert({
          userId: userId,
          message: `User: ${user.name} of Cluster: ${cluster.name}, Meal cancelled: ${mealType}`,
          type: 'single_meal_cancellation',
        });
    
        await alert.save();

        res.status(200).json({ message: 'Meal cancellation notified to admin and bill updated successfully.', bill });
      
    } catch (error) {
        console.error('Error handling meal cancellation:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});


module.exports = router;
