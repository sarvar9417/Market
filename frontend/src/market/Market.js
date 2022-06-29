import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MarketRoutes } from './MarketRoutes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

export const Market = () => {
  const {
    login,
    token,
    logout,
    userId,
    user,
    market,
    administrator,
    loginAdministrator,
  } = useAuth();
  const isAuthenticated = !!token;
  const userRouter = MarketRoutes(isAuthenticated, user, administrator);
  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        logout,
        userId,
        user,
        market,
        isAuthenticated,
        administrator,
        loginAdministrator,
      }}>
      <Router>{userRouter}</Router>
    </AuthContext.Provider>
  );
};
