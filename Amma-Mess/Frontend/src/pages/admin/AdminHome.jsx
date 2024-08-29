import React, { useState } from 'react' 
import Dashboard from '../../components/admin/Dashboard'
import Adhead from '../../components/admin/Adhead'
import Sidebar from '../../components/admin/Sidebar'
import '../../styles/Adminhome.css'




const AdminHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }



  return (
    <div className='grid-container'>
        <Adhead OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Dashboard/>

      
    </div>
  )
}

export default AdminHome
