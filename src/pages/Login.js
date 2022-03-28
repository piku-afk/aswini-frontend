import { useGlobalStore } from '../App';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const { dispatch } = useGlobalStore();
  const [formData, setFromData] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/Login/', {
        email: formData.email,
        password: formData.password,
      });
      const { access } = data;
      dispatch({ type: 'login', payload: { token: `Bearer ${access}` } });
      localStorage.setItem('aswiniAccessToken', `Bearer ${access}`);

      navigate('/');
    } catch {
      setError(true);
    }
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
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email' className='mb-1'>
            Email
          </label>
          <input
            required
            id='email'
            type='email'
            className='form-control mb-3'
            value={formData.email}
            onChange={(e) =>
              setFromData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <label htmlFor='password' className='mb-1'>
            Password
          </label>
          <input
            required
            id='password'
            type='password'
            className='form-control mb-4'
            value={formData.password}
            onChange={(e) =>
              setFromData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          {error && (
            <p style={{ fontWeight: 'bold' }} className='mb-3 text-danger'>
              No user found
            </p>
          )}

          <button type='submit' className='btn btn-primary w-100'>
            Submit
          </button>

          <p className='mt-3 mb-0 text-center'>
            Not having an account ?&nbsp;<Link to='/sign-up'>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
