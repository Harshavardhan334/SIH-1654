import React from 'react';
import {Link, useNavigate } from 'react-router-dom';

export default function HeaderForExpertD() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-white lg:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6">
          <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
            <Link to={'/expert'}
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
            >Home</Link>

          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <button
              onClick={handleLogout}
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
            >
              Log out
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
