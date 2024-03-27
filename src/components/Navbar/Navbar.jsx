import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';

const Navbar = () => {
  const { search, setSearch } = useBlog();
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <form className="w-80 py-4 pt-0 pl-3">
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
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center lg:order-2">
          <Link
            to="#"
            className="text-gray-800 hover:bg-lime-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 m-5 lg:py-2.5 mr-2 focus:outline-none"
          >
            Log in
          </Link>
        </div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? 'text-rose-600-700' : 'text-gray-700'
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? 'text-rose-700' : 'text-gray-700'
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
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
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
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
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                
              >
                Github
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

