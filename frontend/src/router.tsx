import { createBrowserRouter } from 'react-router-dom';
import {
  LoginPage,
  HomePage,
  SignupPage,
  ProfilePage,
  FeedPage,
  ThreadPage,
  NotificationsPage,
  NotFoundPage,
} from '@pages/index';
import { Layout } from '@components/index';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/profile/:id/threads',
          element: <FeedPage />,
        },
        {
          path: '/threads',
          element: <FeedPage />,
        },
        {
          path: '/notifications',
          element: <NotificationsPage />,
        },
        {
          path: '/threads/:id',
          element: <ThreadPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
