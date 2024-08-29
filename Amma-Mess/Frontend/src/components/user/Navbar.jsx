import React from 'react'
import img1 from '../../assets/logo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src={img1} alt="logo" style={{height:'50px',width:'50px'}} />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Contact">Contact Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href='/profile'>Profile</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        {/* <input class="form-control me-2" type='button' aria-label="Search"/> */}
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
                <Link className="nav-link" to="/notifications">Notifications</Link> 
              </li>
        <li class="nav-item">
          <a class="nav-link  me-2" aria-current="page" href="/bill">Bill</a>
        </li>
        </ul>
        <Link to='/login'><button class="btn btn-outline-success" type="submit">logout</button></Link>
      </form>
    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar
