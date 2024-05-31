import React from 'react'

const Temoin = () => {
    const temoins=[
        {img:"person1.jpg",name:"Michael Thompson",opinion:"Since we started using Resident Connect, the level of communication within our community has skyrocketed. It's such a user-friendly platform, and I appreciate how efficiently it helps us share updates, organize events, and stay connected with one another. It's truly been a game-changer!",},
        {img:"person2.jpg",name:"Sophia Nguyen",opinion:"I can't say enough good things about Resident Connect! It's transformed the way we interact and communicate within our neighborhood. The ease of use, coupled with its robust features for event organization and community updates, has made it an essential part of our daily lives. Kudos to the team behind this fantastic platform!",},
        {img:"person3.jpg",name:"David Rodriguez",opinion:"Resident Connect is amazing! It's become an indispensable tool for our neighborhood. From effortlessly staying informed about upcoming events to connecting with fellow residents, this platform has exceeded all my expectations. It's intuitive, efficient, and has brought our community closer together",}
    ]
  return (
    <section className="bg-white">
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Read trusted reviews from our customers
      </h2>
  
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        {temoins.map((customer,index)=>(
 <blockquote key={index} className="rounded bg-gray-200 p-6 shadow-sm sm:p-8">
 <div className="flex items-center gap-4">
   <img
     alt=""
     src={customer.img}
     className="size-14 rounded-full object-cover"
   />

   <div>
     <div className="flex justify-center gap-0.5 text-yellow-500">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
         />
       </svg>
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
         />
       </svg>
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
         />
       </svg>
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
         />
       </svg>
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
         />
       </svg>
     </div>

     <p className="mt-0.5 text-lg font-medium text-gray-900">{customer.name}</p>
   </div>
 </div>

 <p className="mt-4 text-gray-700">
   {customer.opinion}
 </p>
</blockquote>
        ))}
       
  

  

      </div>
    </div>
  </section>
  )
}

export default Temoin