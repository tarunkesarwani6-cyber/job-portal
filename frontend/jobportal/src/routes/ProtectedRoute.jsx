import React from 'react'
import { Navigate,useLocation, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ requiredRole}) => {
  return <Outlet />
}

export default ProtectedRoute;
