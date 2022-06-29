import { useCallback, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useHttp } from '../../../../hooks/http.hook';
import { Notify } from './Notify';

export const Requests = () => {
  const { request } = useHttp();

  const notify = Notify().notify;

  const auth = useContext(AuthContext);

  const getFilials = useCallback(
    async (setFilials) => {
      try {
        const data = await request(
          `/api/connections/getfilials`,
          'POST',
          {
            market: auth.market,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setFilials(data);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  return {
    getFilials,
  };
};
