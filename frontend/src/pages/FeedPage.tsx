import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getThreads, getUserProfile, getUsersThreads } from 'src/api';
import { POSTS_PER_PAGE } from 'src/constants/constants';
import { handleError } from 'src/helpers/errorHandler';
import { Button } from '@ui/button';
import { ThreadsList, NewPostTextarea } from '@components/index';
import { IPost, IUser } from '../interfaces';
import useUserStore from '../store/authorized-user.store';

const FeedPage = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const [addPost, setAddPost] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<IPost[]>([]);
  const [authorOfPosts, setAuthorOfPosts] = useState<IUser | null>(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        if (id) {
          const [userProfile, response] = await Promise.all([
            getUserProfile(id),
            getUsersThreads(id, 1, POSTS_PER_PAGE),
          ]);
          setAuthorOfPosts(userProfile);
          setVisiblePosts(response.data);
          setTotalPosts(response.total);
        } else {
          setAuthorOfPosts(null);
          const response = await getThreads(1, POSTS_PER_PAGE);
          setVisiblePosts(response.data);
          setTotalPosts(response.total);
        }
        setPage(2);
      } catch (error) {
        handleError(error);
      }
    };

    fetchInitialPosts();
  }, [id, posts]);

  const loadMorePosts = async () => {
    if (visiblePosts.length >= totalPosts && totalPosts > 0) return;
    try {
      const response = await getThreads(page, POSTS_PER_PAGE);
      setVisiblePosts(prev => [...prev, ...response.data]);
      setPage(prev => prev + 1);
      setTotalPosts(response.total);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between pl-5 pr-5">
        <div className="custom-heading">
          Threads {authorOfPosts && `by ${authorOfPosts?.username}`}
        </div>
        {user && (
          <Button
            className="px-4 py-2 bg-pink-700 text-white rounded"
            disabled={addPost}
            onClick={() => setAddPost(prev => !prev)}
          >
            Create New One
          </Button>
        )}
      </div>
      {addPost && (
        <NewPostTextarea setAddPost={setAddPost} setPosts={setPosts} />
      )}
      <ThreadsList posts={visiblePosts} />
      {visiblePosts.length < totalPosts && (
        <div className="text-center">
          <Button size="lg" onClick={loadMorePosts}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
