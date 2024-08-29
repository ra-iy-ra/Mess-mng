import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import AdminHome from './pages/admin/AdminHome'
import Clusters from './pages/admin/Clusters'
import Clustermanagement from './pages/admin/Clustermanagement'
import Table from './components/admin/Table'
import Alert from './components/admin/Alert'


import UserProfile from './pages/user/UserProfile'
import MonthlyPlans from './pages/user/MonthlyPlans'
import WeeklyPlans from './pages/user/WeeklyPlans'
import Home from './pages/user/Home'
import Contact from './pages/user/Contact'
import Billpage from './pages/user/Billpage'


import Edit from './components/admin/Menu/Edit'
import Add from './components/admin/Menu/Add'
import Menus from './pages/admin/Menus'
import Customers from './pages/admin/Customers'
import AdminMessage from './components/admin/AdminMessage'
import Notifications from './components/user/Notifications'
// import UserDetails from './components/admin/UserDetails'
// import View from './components/admin/Menu/View'



function App() {
 

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

{/* admindashboard paths */}
        <Route path="/adminhome" element={<AdminHome/>}></Route>
        <Route path="/clusters" element={<Clusters/>}></Route>
        <Route path="/clustermanagement" element={<Clustermanagement/>}></Route>
        <Route path="/clusters/:id/users" element={<Table/>}></Route>
        <Route path="/customer" element={<Customers/>}></Route>
        <Route path="/sendmessage" element={<AdminMessage/>}></Route>
        <Route path="/alert" element={<Alert/>}></Route>

        {/* <Route path="/clusters/:id/users" element={<UserDetails/>} /> */}


  {/* menu */}
         <Route path='/menu' element={<Menus/>}></Route>
          <Route path='/edit/:id' element={<Edit/>}></Route>
          <Route path='/create' element={<Add/>}/>


{/* user paths */}
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/weeklyplans' element={<WeeklyPlans/>}></Route>
          <Route path='/monthlyplans' element={<MonthlyPlans/>}></Route>
          <Route path="/bill" element={<Billpage/>}></Route>
          <Route path="/notifications" element={<Notifications/>}></Route>

          <Route path="/profile" element={<UserProfile/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
