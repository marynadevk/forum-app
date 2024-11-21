import { useNavigate } from 'react-router-dom';
import { Button } from '@ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { IPost } from '../interfaces';

type Props = {
  posts: IPost[];
};

const PostsList = ({ posts }: Props) => {
  const navigate = useNavigate();
  const handleReadMore = (id: string) => {
    navigate(`/threads/${id}`);
  };
  return (
    <div className="flex flex-col gap-3">
      {posts.map(({ body, id, createdAt, title }) => (
        <Card key={id} className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {body.length > 100 ? body.slice(0, 100) + '...' : body}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleReadMore(id)}> Read more </Button>
            <div className="text-sm">
              Posted:{' '}
              <span className="text-slate-400">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsList;
