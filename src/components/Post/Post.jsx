import { useBlog } from '../../context/BlogContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ALL_TASK = '/task/myTasks';

const Post = () => {
  const { search, posts, setPosts, searchResults, setSearchResults, setIsAuthenticated } = useBlog();
  // console.log(isAuthenticated.accessToken)
  const location = useLocation();
  const navigate = useNavigate();
  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPosts = async () => {
      try {
        const response = await apiPrivate.get(ALL_TASK, {
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setPosts(response.data?.tasks);
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) {
          setIsAuthenticated({});
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <main className="w-full flex-grow p-4 overflow-auto">
      {searchResults.length ? (
        searchResults.map((post) => (
          <article className="w-full flex-grow p-4 overflow-auto" key={post._id}>
            <Link className=" text-xl mt-4 mb-4 pb-4 border-b border-gray-300" to={`/post/${post._id}`}>
              <h2 className="hover:text-orange-700">{post.title}</h2>
            </Link>
            <div className="flex items-center justify-between">
              <p className="flex-grow border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm mt-4 mb-4 shadow-white/50 duration-300 text-black">
                {post.description.length <= 25 ? post.description : `${post.description.slice(0, 25)}...`}
              </p>

              <Link
                to={`/edit/${post._id}`}
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-lime-400 ml-4"
              >
                ✏️
              </Link>
            </div>
            <p className="px-3 gap-x-3 text-sm  mb-2 text-yellow-500">Author : {post.author}</p>
          </article>
        ))
      ) : (
        <p className="mt-8 text-red-500"> No posts to display.</p>
      )}
    </main>
  );
};

export default Post;
