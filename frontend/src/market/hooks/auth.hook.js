import { useCallback, useEffect, useState } from 'react';

const storageName = 'userData';
export const useAuth = () => {
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

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    setMarket(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.user, data.market);
    }
  }, [login]);

  return { login, logout, token, userId, user, market, setUser };
};
