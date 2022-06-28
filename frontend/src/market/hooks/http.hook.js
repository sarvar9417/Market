import { t } from 'i18next';
import { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
export const useHttp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const request = useCallback(
    async (url, method = 'GET', body = 'null', headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          if (data.message === t("Avtorizatsiyadan o'tilmagan")) {
            auth.logout();
            history.push('/');
          }

          throw new Error(
            data.message ||
              data.error ||
              t('Ko`zda tutilmagan xatolik yuz berdi')
          );
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e.message;
      }
    },
    [auth, history]
  );
  const clearError = useCallback(() => setError(null), [setError]);
  return { loading, request, error, clearError };
};
