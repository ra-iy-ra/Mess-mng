import React from 'react'
import img1 from '../../assets/lunch.jpeg'
import img2 from '../../assets/dinner.jpeg'
// import {Link} from "react-router-dom";

const Combo = () => {
  return (
    <div className='container'>
        <h1 className='mx-auto'>  COMBO DEAL</h1>
         <div style={{display:'flex', margin:100, justifyContent:'space-around'}}>
      <div class="card" style={{width: '18rem'}}>
  <img src={img1} class="card-img-top" alt="..." style={{height:'100px',width: '206px',paddingLeft: '57px'}}/>
  <div class="card-body" style={{marginTop:'35px'}}>
    <h5 class="card-title">Weekly</h5>
    <a href="/weeklyplans" class="btn btn-primary">Know more</a>
  </div>
</div>


<div class="card" style={{width: '18rem'}}>
  <img src={img2} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Monthly </h5>
    <a href="/monthlyplans" class="btn btn-primary">Know more</a>
  </div>
</div>
    </div>
    </div>
  )
}

export default Combo
