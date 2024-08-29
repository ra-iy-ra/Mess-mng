import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

function View() {
  const [menus, setMenus] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/menus')
      .then(menus => setMenus(menus.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(res => {
        console.log(res);
        setMenus(menus.filter(menu => menu._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container-fluid' style={{ width: '1000px' }}>
      <Fragment>
        <div style={{ margin: "5rem" }}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id}>
                <td>{format(new Date(menu.date), 'dd-MM-yyyy')}</td>
                  <td>{menu.day}</td>
                  <td>{menu.breakfast}</td>
                  <td>{menu.lunch}</td>
                  <td>{menu.dinner}</td>
                  <td>
                    <Link to={`/edit/${menu._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    &nbsp;
                    <Button onClick={() => handleDelete(menu._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Link to='/create' className='d-grid gap-2'>
            <Button size='lg'>Create</Button>
          </Link>
        </div>
      </Fragment>
    </div>
  );
}

export default View;
