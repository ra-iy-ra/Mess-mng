// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Bill = require('../models/bill');
// const Meal = require('../models/meal'); 
// const authenticate = require('../Middleware/authentication');


// router.post('/select-meal', authenticate, async (req, res) => {
//   const { mealType } = req.body; 
//   try {
//     const userId = req.user.id;
    
    
//     const meal = await Meal.findOne({ type: mealType });
//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }

    
//     await User.findByIdAndUpdate(userId, {
//       $set: { [`selectedMeals.${mealType}`]: true }
//     });

  
//     await Bill.updateOne(
//       { user: userId, date: new Date() },
//       { $push: { selectedItems: { mealType, price: meal.price } } }
//     );

//     res.status(200).json({ message: 'Meal selected successfully', meal });
//   } catch (error) {
//     res.status(500).json({ message: 'Error selecting meal', error });
//   }
// });

 
// router.post('/cancel-meal', authenticate, async (req, res) => {
//   const { mealType } = req.body;
//   try {
//     const userId = req.user.id;

    
//     await Bill.updateMany(
//       { user: userId, 'selectedItems.mealType': mealType },
//       { $set: { 'selectedItems.$.status': 'Cancelled' } }
//     );

//     res.status(200).json({ message: 'Meal cancellation notified to admin' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error cancelling meal', error });
//   }
// });

// module.exports = router;
