import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useBlog();
  const location = useLocation();
  

  return isAuthenticated?.accessToken ? <Outlet /> : <Navigate to='/login' state={{from:location}} replace />;
};

export default ProtectedRoute;
