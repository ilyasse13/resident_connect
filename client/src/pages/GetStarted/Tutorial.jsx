import React from 'react';

const Tutorial = () => {
  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">
        Getting Started with My App: A Step-by-Step Guide.
        </h2>
      </div>
  
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
        
        {/* Embed your video here */}
        <iframe
          className="rounded-lg w-4/5 h-80"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      
        </div>
  
        <div className="lg:py-16">
          <article className="space-y-4 text-gray-600">
            <p>
            Welcome to My App! This tutorial will walk you through the basics of using our application, from signing up to exploring key features. Whether you're a new user or looking to get the most out of My App, this guide has you covered. Let's dive in and get started!
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
);
};


export default Tutorial;
