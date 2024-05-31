import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

const AddRequest = () => {
  const {user}=useStateContext()
  if(user.Type === 'Admin'){
    return <Navigate to='/Requests'/>
  }
  return (
    <div>AddRequest</div>
  )
}

export default AddRequest