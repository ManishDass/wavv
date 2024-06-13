// components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../firebaseConfig';

const PrivateRoute = () => {
  const  user = false;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
