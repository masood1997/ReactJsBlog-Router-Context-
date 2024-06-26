import { useLocation, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const NEW_TASK = '/task/new';

const NewPost = () => {
  const { title, description, author, setAuthor, setTitle, setPosts, setDescription, setIsAuthenticated } = useBlog();
  const location = useLocation();
  const navigate = useNavigate();
  const apiPrivate = useAxiosPrivate();

  const handleAddNewPost = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post(NEW_TASK, { title, description, author });
      setPosts((prevPosts) => [...prevPosts, response.data?.task]);
      setTitle('');
      setAuthor('');
      setDescription('');
      navigate('/');
    } catch (error) {
      console.log(error);
      console.log(`Error occured while creating post: ${error?.response?.data?.message}`);
      if (error?.response?.status === 401) {
        setIsAuthenticated({});
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <form onSubmit={handleAddNewPost} className="w-full flex-grow p-4 bg-white flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Your Post Title"
        className="w-1/2 font-sans min-h-12 text-base border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 mt-2"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Something on your Mind again !!!"
        className="w-1/2 font-sans min-h-20 text-base border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 mt-2"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        type="text"
        placeholder="Your Name goes here"
        className="w-1/2 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 mt-2"
        value={author}
        required
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        type="submit"
        className="self-center max-w-1/2 rounded-lg px-3 py-1 bg-lime-500 hover:bg-yellow-500 text-white shrink-0 items-center"
      >
        Add Post
      </button>
    </form>
  );
};

export default NewPost;
