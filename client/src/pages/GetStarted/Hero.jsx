import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
  

<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
      Get Started with Resident Connect
      </h2>

      <p className="hidden text-gray-500 md:mt-4 md:block">
      

Welcome to Resident Connect, your private social media platform designed exclusively for residents of our community. Connecting with your neighbors has never been easier!
      </p>

      <div className="mt-4 md:mt-8">
        <Link
          to="/Signup"
          className="inline-block rounded bg-slate-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-slate-900 focus:outline-none focus:ring focus:ring-gray-200"
        >
          Get Started 
        </Link>
      </div>
    </div>
  </div>

  <img
    alt=""
    src="backgroundim.jpg"
    className="h-56 w-full object-cover sm:h-full"
  />
  
</section>
  )
}

export default Hero