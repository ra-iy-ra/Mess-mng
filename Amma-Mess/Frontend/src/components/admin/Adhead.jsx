import React from 'react'
import {BsJustify,BsFillEnvelopeFill,BsFillBellFill,BsPersonCircle,BsSearch} from 'react-icons/bs';
import {Link} from 'react-router-dom'

function Adhead({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        {/* <div className='header-left'>
            <BsSearch  className='icon'/>
        </div> */}
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            {/* <BsFillEnvelopeFill className='icon'/> */}
            <Link to='/login'><button class="btn btn-outline-success" type="submit">logout</button></Link>
            {/* <BsPersonCircle className='icon'/> */}
        </div>
    </header>
  )
}

export default Adhead
