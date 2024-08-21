import React, { useRef, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../api/axios';

const Login = () => {
  const { token, setUser, setToken } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null);

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
        setErrorMessage('Username or password is incorrect!');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  if (token) {
    return <Navigate to='/Home' />;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-full sm:max-w-md lg:max-w-lg mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className='text-xl sm:text-2xl lg:text-3xl text-slate-900 font-semibold text-center'>
        Log in to your Account
      </h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 sm:mt-6 lg:mt-8">
          {errorMessage}
        </div>
      )}

      <div className="col-span-6 mt-4 sm:mt-6 lg:mt-8">
        <label htmlFor="Username" className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="Username"
          name="username"
          ref={usernameRef}
          placeholder='Username'
          className="mt-1 block w-full h-8 sm:h-10 lg:h-12 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm sm:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 mt-4 sm:mt-6 lg:mt-8">
        <label htmlFor="Password" className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="Password"
          name="password"
          ref={passwordRef}
          placeholder='Password'
          className="mt-1 block w-full h-8 sm:h-10 lg:h-12 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm sm:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 mt-4 sm:mt-6 lg:mt-8">
        <input
          type="submit"
          className="inline-block w-3/4 rounded border border-slate-800 bg-slate-800 px-4 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-medium text-white transition hover:bg-transparent hover:text-slate-800 focus:outline-none focus:ring active:text-blue-500"
          value="Log in"
        />
      </div>
    </form>
  );
};

export default Login;
