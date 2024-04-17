import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useMemo } from 'react';
import Loader from '../Loader/Loader'
const ALL_TASK = '/task/myTasks';

const PostPage = () => {
  const { _id } = useParams();
  const { posts, setPosts, setIsAuthenticated } = useBlog();
  const apiPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const post = useMemo(() => posts.find((post) => post._id === _id), [posts, _id]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!posts.length) {
        try {
          const response = await apiPrivate.get(ALL_TASK);
          setPosts(response?.data?.tasks);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPosts();
  }, [apiPrivate, posts.length]);

  const handleDeletePost = async (id) => {
    try {
      await apiPrivate.delete(`/task/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      navigate('/');
    } catch (error) {
      console.log(error);
      console.log(`Error occured while deleting post: ${error?.response?.data?.message}`);
      if (error?.response?.status === 401) {
        setIsAuthenticated({});
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <main className="container mx-auto px-4 mt-8 h-screen">
      <article className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        {post && (
          <>
            <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <p className="text-stone-900">Author : {post.author}</p>
            <button className="absolute bottom-4 right-4 text-2xl" onClick={() => handleDeletePost(_id)}>
              🗑️
            </button>
          </>
        )}
        {!post && (
          <Loader/>
        )}
      </article>
    </main>
  );
};

export default PostPage;
