import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const [day, setDay] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getmenus/${id}`)
      .then((res) => {
        const menu = res.data;
        setDay(menu.day);
        setBreakfast(menu.breakfast);
        setLunch(menu.lunch);
        setDinner(menu.dinner);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/edit/${id}`, { day, breakfast, lunch, dinner })
      .then((result) => {
        console.log(result);
        navigate("/menu");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form className='d-grid gap-2' style={{ margin: '15rem' }}>
        <Form.Group className='mb-3' controlId='formDay'>
          <Form.Control type='text' placeholder='Enter Day' value={day} required onChange={(e) => setDay(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBreakfast'>
          <Form.Control type='text' placeholder='Enter Breakfast' value={breakfast} required onChange={(e) => setBreakfast(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLunch'>
          <Form.Control type='text' placeholder='Enter Lunch' value={lunch} required onChange={(e) => setLunch(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formDinner'>
          <Form.Control type='text' placeholder='Enter Dinner' value={dinner} required onChange={(e) => setDinner(e.target.value)} />
        </Form.Group>
        <Button type='submit' onClick={(e) => handleSubmit(e)}>Update</Button>
      </Form>
    </div>
  );
};

export default Edit;
