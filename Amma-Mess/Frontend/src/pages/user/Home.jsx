import React,{useEffect} from 'react'
import Navbar from '../../components/user/Navbar'
import Header from '../../components/user/Header'
import Card from '../../components/user/Card'
import Combo from '../../components/user/Combo'
import { requestFirebaseNotificationPermission } from '../../firebase';  

const Home = () => {
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then(token => {
        console.log('Firebase Notification Token:', token);
      })
      .catch(err => {
        console.error('Error in requesting permission', err);
      });
  }, []);
  return (
    <div>
        <Navbar/>
        <Header/>
        <Card/>
        <Combo/>
      
    </div>
  )
}

export default Home
