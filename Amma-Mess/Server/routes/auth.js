const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cluster = require('../models/Cluster');
const router = express.Router();
const auth = require('../Middleware/authentication');


 const SECRET_KEY = '3c8c15426b5f951bb32507d9e64f333cb33513fbdd175dc4747338018b0e91df'; 


// Register 
router.post('/register', async (req, res) => {
  const { name, email, password, cluster } = req.body;

  if (!name || !email || !password || !cluster) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
          name,
          email,
          password,
          cluster,
          planType:null,
          planEndDate:null,
          dateOfRegistration: new Date()  
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      
      await Cluster.findByIdAndUpdate(cluster, {
          $push: { users: user._id }
      });
     const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    

      res.status(201).json({ token, msg: 'User registered successfully'});
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Admin login
        if (email === 'admin@gmail.com') {
            const adminPassword = 'admin123'; 
            if (password === adminPassword) {
                const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).json({ role: "admin",token});
            } else {
                return res.status(400).json("Invalid credentials");
            }
        }
  
        // User login
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid credentials");
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid credentials");
        }
         const token = jwt.sign({ id: user._id ,name: user.name,role:user.role}, SECRET_KEY, { expiresIn: '1h' });
  
          res.status(200).json({ role: "user" ,token , userId: user._id });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json("Server error");
    }
  });
  






  // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find().populate('cluster', 'name'); 
//     res.json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// today's customers
router.get('/users', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const users = await User.find({
      planEndDate: { $gte: today }
    }).populate('cluster', 'name');

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});




// user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cluster').select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }


    res.json({
      name: user.name,
      cluster: user.cluster,
      planType: user.planType,
      planEndDate: user.planEndDate,
      dateOfRegistration: user.dateOfRegistration
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


  

module.exports = router;






  











