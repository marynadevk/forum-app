import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';

type Props = {
  text?: string;
};

const NotFoundPage = ({ text }: Props) => {
  const navigate = useNavigate();
  const textForView = text ? text : 'We couldn\'t find the page you\'re looking for';
  return (
    <div className="relative" style={{ height: 'calc(100vh - 120px)'}}>
      <h1 className="text-6xl font-accent absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        {textForView}
      </h1>
      <div>
        <img
          src="/images/welcome-img.png"
          alt="welcome img"
          className="w-full h-96 object-cover absolute left-0 bottom-0"
        />
        <Button
          className="font-accent text-xl p-2"
          onClick={() => navigate(-1)}
        >
          Get back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
