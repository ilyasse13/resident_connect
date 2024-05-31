import React, { useRef, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Navigate } from 'react-router-dom';
import axiosClient from '../../api/axios';

const Login = () => {
  const { token, setUser, setToken } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null); // State to hold error message

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
  
    try {
      const { data } = await axiosClient.post('/login', payload);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If unauthorized, set error message
        setErrorMessage('Username or password is incorrect!');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }
  
  if (token) {
    return <Navigate to='/Home' />;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-96 gap-10">
      <h1 className='text-4xl text-slate-900 font-semibold'>Log in to your Account</h1>
      {/* Render error message if exists */}
      {errorMessage && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6 -mb-7">
        {errorMessage}
    </div>
)}
      <div className="col-span-6 m-14 sm:col-span-3">
      
        <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="Username"
          name="username"
          ref={usernameRef}
          placeholder='Username'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 m-14 sm:col-span-3">
        <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
        <input
          type="password"
          id="Password"
          name="password"
          ref={passwordRef}
          placeholder='Password'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
      
      <div className="col-span-6 ml-14 sm:flex sm:items-center sm:gap-4">
        <input
          type="submit"
          className="inline-block rounded shrink-0 border border-slate-800 bg-slate-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-slate-800 focus:outline-none focus:ring active:text-blue-500"
          value={'Log in'}
        />
          
        
      </div>
    </form>
      )
}

export default Login;
