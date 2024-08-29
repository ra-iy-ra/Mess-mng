import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Menu = () => {
const [menus,setMenus]=useState([])
  useEffect(()=>{
  
    axios.get('http://localhost:3001/api/menus')
    .then(menus=>setMenus(menus.data))
    .catch(err=>console.log(err))

    // axios.delete('http://localhost:3001//delete/:id')
    // .then(menus=>setMenus(menus.data))
    // .catch(err=>console.log(err))


  },[])
  return (
    <div className='container'>
      <h1>Weekly Menu</h1>
      <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">BreakFast</th>
      <th scope="col">Lunch</th>
      <th scope="col">Dinner</th>
    </tr>
  </thead>
  <tbody>

    {
      menus.map(menu=>{
        return <tr>
  
      <td scope="row">{menu.day}</td>
      <td>{menu.breakfast}</td>
      <td>{menu.lunch}</td>
      <td>{menu.dinner}</td>
    </tr>
      })
    }
    
    
  </tbody>
</table>
    </div>
  )
}

export default Menu