import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

const AdminRequestPage = () => {
  const {user}=useStateContext()
  if(user.Type !== 'Admin'){
    return <Navigate to='/MakeRequest'/>
  }
  return (
    <div>AdminRequestPage</div>
  )
}

export default AdminRequestPage