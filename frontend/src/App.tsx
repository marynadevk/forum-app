import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getMe } from './api/auth';
import { router } from './router';
import useUserStore from './store/authorized-user.store';

const App = () => {
  const { setUser } = useUserStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then(user => {
          setUser(user);
        })
        .catch(err => {
          console.error(err);
          localStorage.removeItem('token');
        });
    }
  }, [setUser]);

  return <RouterProvider router={router} />;
};

export default App;
