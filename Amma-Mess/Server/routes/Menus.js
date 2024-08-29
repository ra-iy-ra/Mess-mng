const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');


router.get('/menus', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/getmenus/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/create', async (req, res) => {
  const { date,day, breakfast, lunch, dinner } = req.body;
  try {
    const newMenu = new Menu({ date,day, breakfast, lunch, dinner });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/edit/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//fetch the menu for the current date
router.get('/menu/today', async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; 
  try {
    const { date } = req.params;
    const menu = await Menu.findOne({ date:today });
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ msg: 'No menu found for this date' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
