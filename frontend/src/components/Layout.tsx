import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '@components/index';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="m-0 mx-auto p-3.5 min-h-svh max-h-max align-middle max-w-7xl bg-background pt-24">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
