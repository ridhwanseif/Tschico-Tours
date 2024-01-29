import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const currentUser = false; // Replace this with your authentication logic

const ProtectedRoute = ({ path, element }) => {
  return currentUser ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
