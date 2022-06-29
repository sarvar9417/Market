import { useCallback, useEffect, useState } from 'react';

const storageName = 'userData';
const storageAdmin = 'adminData';
export const useAuth = () => {
  const [administrator, setAdministrator] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [market, setMarket] = useState(null);
  const login = useCallback((jwtToken, id, user, market) => {
    setToken(jwtToken);
    setUserId(id);
    setUser(user);
    setMarket(market);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        user: user,
        market: market,
      })
    );
  }, []);

  const loginAdministrator = useCallback((jwtToken, administrator) => {
    setToken(jwtToken);
    setAdministrator(administrator);

    localStorage.setItem(
      storageAdmin,
      JSON.stringify({
        token: jwtToken,
        administrator: administrator,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    setMarket(null);
    setAdministrator(null);
    localStorage.removeItem(storageName);
    localStorage.removeItem(storageAdmin);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.user, data.market);
    }
  }, [login]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageAdmin));
    if (data && data.token) {
      loginAdministrator(data.token, data.administrator);
    }
  }, [loginAdministrator]);
  return {
    login,
    logout,
    token,
    userId,
    user,
    market,
    setUser,
    administrator,
    loginAdministrator,
  };
};
