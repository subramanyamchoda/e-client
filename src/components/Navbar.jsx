import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <>
    <nav className="bg-white border-gray-200 text1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap  text-gray-900">
  Rice Store
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="font-medium flex text-2xl flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
           
            <li>
              <Link
                to="/cart"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Cart
              </Link>
            </li>
           
            <li>
              <Link
                to="/order"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <hr  className="border-1" />
    </>
  );
};

export default Navbar;
