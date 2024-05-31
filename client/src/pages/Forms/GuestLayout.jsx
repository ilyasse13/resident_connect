import React from 'react'
import { GiExitDoor } from "react-icons/gi";
import { Link, Outlet } from 'react-router-dom'

const GuestLayout = () => {

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="SignUp1.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className=" mb-44 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Resident Connect
            </h2>

          </div>
        </section>
        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl" >
            <Link to="/main">
            <div className="flex ml-96 -mr-4 -mt-1 items-center justify-center bg-slate-800 text-white w-28 px-3 py-2 rounded-full hover:bg-white hover:text-slate-800 hover:border border-slate-800 transition duration-300 ease-in-out">
              
              <GiExitDoor className="mr-1" />Exit
           
           
          </div>
            </Link>
            
            <div className="relative -mt-16 block lg:hidden">

              <h1 className="mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Resident Connect
              </h1>
            </div>
            <Outlet />

          </div>
        </main>
      </div>
    </section>
  )
}

export default GuestLayout