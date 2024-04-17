import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';

const Navbar = () => {
  const { search, setSearch, isAuthenticated } = useBlog();
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 flex flex-wrap justify-between items-center my-3 mx-auto max-w-screen-xl">
      {isAuthenticated?.accessToken && (
        <form className="w-full lg:w-80 lg:order-1 py-4 pt-0 pl-3 mr-3">
          <label className="absolute left-[-99999px]" htmlFor="search">
            Search Posts
          </label>
          <input
            className="font-sans w-full min-h-10 text-base border-gray-300 px-1 py-0.25 rounded outline-stone-500 flex border"
            type="text"
            placeholder="Search Blogs"
            value={search}
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      )}
      <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto lg:order-2 lg:justify-end">
        <ul className="flex flex-col lg:flex-row mt-4 font-medium lg:space-x-8 lg:mt-0">
          {isAuthenticated?.accessToken && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? 'text-rose-600-700' : 'text-gray-700'
                  } border-b border-gray-100 hover:bg-gray-200 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? 'text-rose-700' : 'text-gray-700'
                } border-b border-gray-100 hover:bg-gray-200 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? 'text-rose-700' : 'text-gray-700'
                } border-b border-gray-100 hover:bg-gray-200 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/github"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? 'text-rose-700' : 'text-gray-700'
                } border-b border-gray-100 hover:bg-gray-200 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Github
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center lg:ml-8">
          {isAuthenticated?.accessToken ? (
            <Link
              to="/logout"
              className="text-gray-800 hover:bg-lime-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-4 py-2 lg:py-2.5 focus:outline-none"
            >
              Log Out
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 hover:bg-lime-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-4 py-2 lg:py-2.5 focus:outline-none"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
