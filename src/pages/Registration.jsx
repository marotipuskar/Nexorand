// src/pages/Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Registration = () => {
  const [form, setForm] = useState({username:'', firstName:'', lastName:'', email: '', password: ''  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // http://localhost:7000/api/user/v1/get-users
    try {
      await axios.post('http://localhost:7000/api/auth/v1/register', form);
      
      // console.log(form)
      alert('Registration successful');
      console.log("Registration success", response.data);
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <h1 className='text-center'>Register</h1>

    
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
      <input name='firstName' type="text" placeholder='firstName' value={form.firstName} onChange={handleChange} className="p-2 mb-4 border"/>
      <input name='lastName' type="text" placeholder='lastName' value={form.lastName} onChange={handleChange} className="p-2 mb-4 border"/>
      <input name='username' type="text" placeholder='username' value={form.username} onChange={handleChange} className="p-2 mb-4 border"/>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 mb-4 border" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="p-2 mb-4 border" />
      {/* <input name="points" type="number" value={form.points} onChange={handleChange} placeholder="points" className="p-2 mb-4 border" /> */}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Register</button>
      <div className='flex justify-between space-x-4'>
        <p>Have an account</p>
        <Link to="/login" className='text-blue-400 hover:underline'>Login Here</Link>
      </div>
    </form>
    </div>
  );
};

export default Registration;