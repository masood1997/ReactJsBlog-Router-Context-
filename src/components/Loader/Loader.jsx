import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="loader-container flex justify-center items-center bg-gray-100 rounded-lg shadow-md p-6">
      <div className="loader border-t-4 border-b-4 border-amber-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  </div>
  );
};

export default Loader;