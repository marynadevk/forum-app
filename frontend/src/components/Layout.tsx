import { Outlet } from 'react-router-dom';
import { Header } from '@components/index';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="m-0 mx-auto p-3.5 min-h-svh max-h-max align-middle max-w-7xl bg-background pt-24">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
