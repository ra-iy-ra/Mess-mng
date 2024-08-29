import React from 'react'
import img1 from '../../assets/logo.png'
import 
{BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill,BsGrid1X2Fill } from 'react-icons/bs';
  import { AiFillMessage } from "react-icons/ai";
import axios from 'axios'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const sendNotification = async (message) => {
        try {
          const response = await axios.post('http://localhost:3001/api/admin/send', { message });
          alert('Notification sent successfully');
        } catch (error) {
          console.error('Error sending notification:', error);
          alert('Failed to send notification');
        }
      };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                {/* <BsCart3  className='icon_header'/>  */}
                <img src={img1} alt="logo" style={{height:'90px',width:'90px'}} />
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/adminhome">
                    < BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/menu">
                    <BsFillArchiveFill className='icon'/> Menu
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/clusters">
                    <BsFillGrid3X3GapFill className='icon'/> Clusters
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/customer">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
          <a href="/sendmessage">
            <BsEnvelope className='icon' /> Send Message
          </a>
        </li> */}
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>

            <li className='sidebar-list-item'>
          <button onClick={() => sendNotification('Meal is ready')} className='notification-btn'>
            <AiFillMessage  className='icon' /> Notify: Meal is ready
          </button>
        </li>
        <li className='sidebar-list-item'>
          <button onClick={() => sendNotification('Meal is going to finish')} className='notification-btn'>
            <AiFillMessage  className='icon' /> Notify: Meal is going to finish
          </button>
        </li>
        <li className='sidebar-list-item'>
          <button onClick={() => sendNotification('Meal is finished')} className='notification-btn'>
            <AiFillMessage  className='icon' /> Notify: Meal is finished
          </button>
        </li>
        </ul>
       
    </aside>
  )
}

export default Sidebar