import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getMe } from './api/auth';
import { router } from './router';
import useUserStore from './store/authorized-user.store';
import useTokenStore from './store/token.store';

const App = () => {
  const { token, removeToken } = useTokenStore();
  const { setUser } = useUserStore();
  useEffect(() => {
    if (token) {
      getMe()
        .then(response => {
          setUser(response);
        })
        .catch(err => {
          console.error(err);
          removeToken();
        });
    }
  }, [token]);

  return <RouterProvider router={router} />;
};

export default App;
