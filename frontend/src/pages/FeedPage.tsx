import { useEffect, useState } from 'react';
import { Button } from '@ui/button';
import { PostsList, NewPostTextarea } from '@components/index';
import { DUMMY_POSTS } from '../dummy-data';
import { IPost } from '../interfaces';

const FeedPage = () => {
  const [addPost, setAddPost] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<IPost[]>([]);
  const postsPerPage = 4;

  useEffect(() => {
    setPosts(DUMMY_POSTS);
    setVisiblePosts(DUMMY_POSTS.slice(0, postsPerPage));
  }, []);

  const loadMorePosts = () => {
    const startIndex = visiblePosts.length;
    const endIndex = startIndex + postsPerPage;
    const nextPosts = posts.slice(startIndex, endIndex);
    setVisiblePosts(prev => [...prev, ...nextPosts]);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between pl-5 pr-5">
        <div className="custom-heading">Threads</div>
        <Button
          className="px-4 py-2 bg-pink-700 text-white rounded"
          disabled={addPost}
          onClick={() => setAddPost(prev => !prev)}
        >
          Create New One
        </Button>
      </div>
      {addPost && <NewPostTextarea setAddPost={setAddPost} />}
      <PostsList posts={visiblePosts} />
      {visiblePosts.length < posts.length && (
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
