import { Link } from 'react-router-dom';
import { Button } from '@ui/button';
import { WelcomeText } from '@components/index';

const HomePage = () => {
  return (
    <>
      <WelcomeText />
      <div className="relative h-1/2">
        <img
          src="/images/welcome-img.png"
          alt="welcome img"
          className="w-full h-96 object-cover absolute top-16 left-0"
        />
        <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 font-accent text-4xl p-6">
          <Link to="/login">Get started</Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
