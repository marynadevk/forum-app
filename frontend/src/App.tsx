import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getMe } from './api/auth';
import { router } from './router';
import useUserStore from './store/authorized-user.store';

const App = () => {
  const token = localStorage.getItem('token');
  const { setUser } = useUserStore();
  useEffect(() => {
    if (token) {
      getMe()
        .then(response => {
          setUser(response);
        })
        .catch(err => {
          console.error(err);
          localStorage.removeItem('token');
        });
    }
  }, [token, setUser]);

  return <RouterProvider router={router} />;
};

export default App;
