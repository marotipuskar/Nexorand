// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <div>
      <h1 className='text-center'>Login</h1>
      {/* <img src="../public/images/profile-icon.png" alt="" /> */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 mb-4 border" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="p-2 mb-4 border" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        <div className='flex justify-between space-x-4'>

          <p>Haven't account</p>
          <Link to="/register" className='text-blue-400 hover:underline'>Register Here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;