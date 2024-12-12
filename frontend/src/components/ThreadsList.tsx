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
import TimeAgo from './TimeAgo';

type Props = {
  posts: IPost[];
};

const ThreadsList = ({ posts }: Props) => {
  const navigate = useNavigate();
  const handleReadMore = (id: string) => {
    navigate(`/threads/${id}`);
  };
console.log(posts);
  return (
    <div className="flex flex-col gap-3">
      {posts.map(({ content, id, createdAt, title }) => (
        <Card key={id + createdAt} className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {content.length > 100 ? content.slice(0, 100) + '...' : content}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleReadMore(id)}> Read more </Button>
            <div className="text-sm">
              Posted:{' '}
              <span className="text-slate-400">
                <TimeAgo date={createdAt} />
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ThreadsList;
