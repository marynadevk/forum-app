import { Link } from 'react-router-dom';
import { Button } from '@ui/button';
import { WelcomeText } from '@components/index';

const HomePage = () => {
  return (
    <div className="relative h-4/5">
      <WelcomeText />
      <div>
        <img
          src="/images/welcome-img.png"
          alt="welcome img"
          className="w-full h-96 object-cover absolute left-0 -bottom-96 "
        />
        <Button className="absolute top-4/5 left-1/2 transform -translate-x-1/2 translate-y-4/5 font-accent text-4xl p-6">
          <Link to="/login">Get started</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
