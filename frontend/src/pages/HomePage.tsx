import { Link } from 'react-router-dom';
import { Button } from '@ui/button';
import { WelcomeText } from '@components/index';
import useUserStore from 'src/store/authorized-user.store';

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <div className="relative" style={{ height: 'calc(100vh - 130px)'}}>
      <WelcomeText />
      <div>
        <img
          src="/images/welcome-img.png"
          alt="welcome img"
          className="w-full h-96 object-cover absolute left-0 bottom-0 "
        />
        <Button className="absolute top-4/5 left-1/2 transform -translate-x-1/2 translate-y-4/5 font-accent text-4xl p-6">
          <Link to={user ? '/threads' : '/login'}>Get started</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
