import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getMe } from './api/auth';
import { countUnreadNotifications } from './api/notifications';
import { router } from './router';
import useUserStore from './store/authorized-user.store';
import useTokenStore from './store/token.store';

const App = () => {
  const { token, removeToken } = useTokenStore();
  const { setUser, setNotificationsCount } =
    useUserStore();

  useEffect(() => {
    async function fetchData() {
      try {
        if (token) {
          const currentUser = await getMe();
          setUser(currentUser);
          const count = await countUnreadNotifications();
          setNotificationsCount(count);
        }
      } catch (err) {
        console.error(err);
        removeToken();
      }
    }
    fetchData();
  }, [token]);


  return <RouterProvider router={router} />;
};

export default App;
