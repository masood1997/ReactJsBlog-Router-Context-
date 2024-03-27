import React from 'react';
import Post from '../Post/Post';
import { useBlog } from '../../context/BlogContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { error } = useBlog();
  return (
    <main className="w-full flex-grow p-4 overflow-y-auto">
      <Link
        to="/new"
        className="rounded-lg ml-6 px-3 py-1 hover:bg-lime-500 shadow-md transition duration-300 hover:scale-105 bg-gray-300 text-stone-800"
      >
        Add New  ➕
      </Link>
      {error ? <p className="mt-8 text-red-500">Error occured while fetching data</p> : <Post />}
    </main>
  );
};

export default Home;
