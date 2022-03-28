import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
  });
  const navigate = useNavigate();

  const changeFormData = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/Register/', formData);
    navigate('/login');
  };

  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          minWidth: 300,
        }}
        className='w-25 p-3'>
        <h1 style={{ fontSize: 28 }} className='text-center'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='row mb-2'>
            <div className='col'>
              <label htmlFor='firstName' className='mb-1'>
                First Name
              </label>
              <input
                required
                id='firstName'
                name='first_name'
                className='form-control'
                type='text'
                value={formData.first_name}
                onChange={changeFormData}
              />
            </div>
            <div className='col'>
              <label htmlFor='lastName' className='mb-1'>
                Last Name
              </label>
              <input
                required
                id='lastName'
                name='last_name'
                className='form-control'
                type='text'
                value={formData.last_name}
                onChange={changeFormData}
              />
            </div>
          </div>
          <label htmlFor='userName' className='mb-1'>
            Username
          </label>
          <input
            required
            id='userName'
            name='username'
            className='form-control mb-2'
            type='text'
            value={formData.username}
            onChange={changeFormData}
          />
          <label htmlFor='email' className='mb-1'>
            Email
          </label>
          <input
            required
            id='email'
            name='email'
            className='form-control mb-2'
            type='email'
            value={formData.email}
            onChange={changeFormData}
          />
          <label htmlFor='mobile' className='mb-1'>
            Mobile
          </label>
          <input
            required
            id='mobile'
            name='mobile'
            className='form-control mb-2'
            type='text'
            value={formData.mobile}
            onChange={changeFormData}
          />
          <label htmlFor='password' className='mb-1'>
            Password
          </label>
          <input
            required
            id='password'
            name='password'
            className='form-control mb-3'
            type='password'
            value={formData.password}
            onChange={changeFormData}
          />
          <button type='submit' className='btn btn-primary w-100'>
            Submit
          </button>
          <p className='mt-3 mb-0 text-center'>
            Already have an account ?&nbsp;<Link to='/login'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
