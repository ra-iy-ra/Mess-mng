const express = require('express');
const router = express.Router();
const Cluster = require('../models/Cluster');


router.get('/clusters', async (req, res) => {
  try {
    const clusters = await Cluster.find();
    res.json(clusters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/clusters', async (req, res) => {
  const { name } = req.body;
  try {
    const newCluster = new Cluster({ name });
    await newCluster.save();
    res.status(201).json(newCluster);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/clusters/:id/users', async (req, res) => {
  try {
      
      const users = await User.find({ cluster: req.params.id });
      
      if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No users found in this cluster' });
      }

      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});






module.exports = router;
