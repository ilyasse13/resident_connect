import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {token, setUser, setToken } = useStateContext();

  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout'); // Call the logout endpoint
      setUser(null); // Clear user data
      setToken(null); // Clear token
      localStorage.removeItem('user')
      localStorage.removeItem('ActiveButton')
      return <Navigate to="/login" />; 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
<button className='rounded bg-red-600 text-white' onClick={handleLogout}>log out</button>  
  )
}

export default Profile