import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const EditPost = () => {
  const { _id } = useParams();
  const apiPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const { posts, editTitle, editDescription, setEditDescription, setEditTitle, setPosts, setIsAuthenticated } = useBlog();
  const post = posts.find((post) => post._id === _id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditDescription(post.description);
    }
  }, [post]);

  const handleEditPost = async (id) => {
    try {
      const response = await apiPrivate.put(`/task/${id}`, {
        title: editTitle,
        description: editDescription
      });
      setPosts((prevPost) => prevPost.map((post) => (post._id === id ? response.data?.task : post)));
      setEditTitle('');
      setEditDescription('');
      navigate('/');
    } catch (error) {
      console.log(error);
      console.log(`Error occured while updating post: ${error?.response?.data?.message}`);
      if (error?.response?.status === 401) {
        setIsAuthenticated({});
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <main className="NewPost">
      <>
        <h2 className="text-xl text-zinc-900">Edit Post</h2>
        <form className="w-full flex-grow p-4 bg-white flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            type="text"
            required
            className="w-1/2 font-sans min-h-12 text-base border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 mt-2"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="postDescription">Description:</label>
          <input
            id="postDescription"
            required
            value={editDescription}
            className="w-1/2 font-sans min-h-20 text-base border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 mt-2"
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button
            className="self-center max-w-1/2 rounded-lg px-3 py-1 bg-lime-500 hover:bg-yellow-500 text-white shrink-0 items-center"
            type="submit"
            onClick={() => handleEditPost(post._id)}
          >
            Submit
          </button>
        </form>
      </>
      {/* {!editTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Post Not Found</h2>
          <p className="text-gray-700 mb-4">Well, that's disappointing.</p>
          <p>
            <Link className="hover:text-orange-700 hover:underline" to="/">
              Visit Our Homepage
            </Link>
          </p>
        </div>
      )} */}
    </main>
  );
};

export default EditPost;
