import React from 'react';
import { GiExitDoor } from "react-icons/gi";
import { Link, Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left section with background image */}
        <section className="relative flex items-end bg-gray-900 lg:col-span-5 xl:col-span-6 h-48 lg:h-full">
          <img
            alt=""
            src="SignUp1.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:block lg:relative lg:p-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-44">
              Welcome to Resident Connect
            </h2>
          </div>
        </section>

        {/* Main content section */}
        <main className="flex items-center justify-center px-6 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Exit button */}
            <Link to="/main">
              <div className="flex justify-end lg:justify-start mb-4">
                <div className="flex items-center bg-slate-800 text-white w-28 px-3 py-2 rounded-full hover:bg-white hover:text-slate-800 hover:border border-slate-800 transition duration-300 ease-in-out">
                  <GiExitDoor className="mr-1" /> Exit
                </div>
              </div>
            </Link>

            {/* Mobile welcome message */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Welcome to Resident Connect
              </h1>
            </div>

            {/* Outlet for form content */}
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default GuestLayout;
