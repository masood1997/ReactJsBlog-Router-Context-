import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
const LOGOUT = '/user/logout';

const Logout = () => {
  const { setIsAuthenticated } = useBlog();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await api.get(LOGOUT)
    setIsAuthenticated({});
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <p className="text-center text-2xl text-neutral-700 mb-10">Are you sure you want to Log Out?</p>
      <div className="flex gap-4">
        <button
          className="text-gray-800 hover:bg-lime-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 m-5 lg:py-2.5 mr-2 focus:outline-none"
          onClick={handleLogOut}
        >
          Log out
        </button>
        <button
          className="text-gray-800 hover:bg-red-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 m-5 lg:py-2.5 mr-2 focus:outline-none"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
