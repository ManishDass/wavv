// components/PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Example: Replace with actual authentication logic
  const isAuthenticated = !!localStorage.getItem('userProfile');

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
