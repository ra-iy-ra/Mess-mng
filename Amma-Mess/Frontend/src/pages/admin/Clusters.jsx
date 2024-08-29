import React, { useState } from 'react'
import Adhead from '../../components/admin/Adhead'
import Sidebar from '../../components/admin/Sidebar'
import Clustermanagement from '../../components/admin/Clustermanagements'
import '../../styles/Cluster.css'
import Cluster from '../../components/admin/Cluster'

const Clusters = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Adhead OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      {/* <Clustermanagement/> */}
      <Cluster/>
    </div>
  )
}

export default Clusters
