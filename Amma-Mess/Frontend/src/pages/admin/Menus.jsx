import React, { useState } from 'react'
import View from '../../components/admin/Menu/View'
// import Navbar from '../../components/admin/Navbar'
import Adhead from '../../components/admin/Adhead'
import Sidebar from '../../components/admin/Sidebar'
import '../../styles/Menus.css'

const Menus = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

  return (
    <div  className='grid-container'>
     {/* <Navbar/> */}
     <Adhead OpenSidebar={OpenSidebar}/>
     <Sidebar  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
     <View/>

    </div>
  )
}

export default Menus
