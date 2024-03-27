import { useBlog } from '../../context/BlogContext';
import { Link } from 'react-router-dom';

const Post = () => {
  const { searchResults } = useBlog();
  return (
    <main className="w-full flex-grow p-4 overflow-hidden">
      {searchResults.length ? (
        searchResults.map((post) => (
          <article className="w-full flex-grow p-4 overflow-hidden" key={post.id}>
            <Link className=" text-xl mt-4 mb-4 pb-4 border-b border-gray-300" to={`/post/${post.id}`}>
              <h2 className="hover:text-orange-700">{post.title}</h2>
            </Link>
            <div className="flex items-center justify-between">
              <p className="flex-grow border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm mt-4 mb-4 shadow-white/50 duration-300 text-black">
                {post.description.length <= 25 ? post.description : `${post.description.slice(0, 25)}...`}
              </p>

              <Link
                to={`/edit/${post.id}`}
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
