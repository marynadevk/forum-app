import { Link } from 'react-router-dom';
import { Navbar } from '@components/index';

const Header = () => {
  return (
    <div className="h-20 font-accent justify-around bg-accent fixed top-0 left-0 w-full shadow-md z-10 flex items-center px-4">
      <Link to="/">
        <img src="/images/rose-logo.png" alt="logo" className="w-12" />
        FORUM
      </Link>
      <Navbar />
    </div>
  );
};

export default Header;
