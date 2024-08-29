import React, { useState } from 'react';
import  Sidebar from '../../components/admin/Sidebar'
import Customer from '../../components/admin/Customer'
import Adhead from '../../components/admin/Adhead';
import '../../styles/Customer.css'


const Customers = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div className='grid-container'>
      <Adhead OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Customer/>
    </div>
  )
}

export default Customers
