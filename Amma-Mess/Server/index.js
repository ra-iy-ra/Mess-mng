const express = require('express');
const mongoose = require('mongoose')

const cors = require('cors')
const jwt = require('jsonwebtoken');
const authenticate = require('./Middleware/authentication');

const app = express()

app.use(express.json()) 

app.use(cors())


mongoose.connect('mongodb://localhost:27017/employee')
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


const clusterRoutes = require('./routes/Clusters');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/Menus'); 
const messageRoutes = require('./routes/messageRoutes');
const billRoutes = require('./routes/billRoute');
const planRoute = require('./routes/planRoute');
const alertRoute = require('./routes/alertRoute');
// const mealRoute = require('./routes/mealRoute')



app.use('/api', menuRoutes);
app.use('/api', clusterRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin', messageRoutes);
app.use('/api', authenticate, billRoutes);
app.use('/api/plan', planRoute);
app.use('/api',authenticate, alertRoute);
// app.use('/api',authenticate,mealRoute)



app.listen(3001, () => {
    console.log("server is running")
})