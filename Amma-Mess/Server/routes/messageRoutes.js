const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');
// const admin = require('firebase-admin');
const Notification = require('../models/message');

router.post('/send', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const notification = new Notification({ message });
    try {
        await notification.save();  

        const payload = {
            topic: 'allUsers',
            notification: {
                title: 'Mess Management Notification',
                body: message,
            },
        };

        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24, 
        };
        const response = await admin.messaging().send(payload); 

        console.log('Firebase Response:', response);

        res.status(200).json({ message: 'Notification sent successfully', response });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Error sending notification', details: error.message });
    }
});


router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Error fetching notifications', details: error.message });
    }
});



module.exports = router;
