// import { createContext } from 'react';

import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  user: null,
  market: null,
  login: noop,
  loginAdministrator: noop,
  logout: noop,
  isAuthenticated: false,
  administrator: null,
});
