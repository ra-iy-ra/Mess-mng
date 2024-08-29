// const mongoose = require('mongoose');
// const User = require('./models/User'); // Adjust the path as needed

// mongoose.connect('mongodb://localhost:27017/employee', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// });

// async function updatePlan(userId) {
//   try {
//     const planType = 'Weekly';
//     const planEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//     const user = await User.findByIdAndUpdate(
//       userId, 
//       { planType, planEndDate }, 
//       { new: true }
//     );

//     if (!user) {
//       console.log('User not found');
//     } else {
//       console.log('User updated:', user);
//     }
//   } catch (error) {
//     console.error('Error updating plan:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// // Replace with a valid userId from your database
// updatePlan('66c9beb9c490e47f78e4e2d8');
