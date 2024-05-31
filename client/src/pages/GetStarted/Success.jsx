import React from 'react'

const Success = () => {
  const temoins=[
    {
      img: "person1.jpg",
      name: "Michael Thompson",
      opinion: "Since we started using Resident Connect, the level of communication within our community has skyrocketed. It's such a user-friendly platform, and I appreciate how efficiently it helps us share updates, organize events, and stay connected with one another. It's truly been a game-changer!",
    },
    {
      img: "person2.jpg",
      name: "Sophia Nguyen",
      opinion: "I can't say enough good things about Resident Connect! It's transformed the way we interact and communicate within our neighborhood. The ease of use, coupled with its robust features for event organization and community updates, has made it an essential part of our daily lives. Kudos to the team behind this fantastic platform!",
    },
    {
      img: "person3.jpg",
      name: "David Rodriguez",
      opinion: "Resident Connect is amazing! It's become an indispensable tool for our neighborhood. From effortlessly staying informed about upcoming events to connecting with fellow residents, this platform has exceeded all my expectations. It's intuitive, efficient, and has brought our community closer together",
    },
    {
      img: "person7.jpeg",
      name: "Emily Johnson",
      opinion: "I've been using Resident Connect for months now, and I'm continually impressed by its capabilities. It's made managing my property so much easier—whether it's sending out announcements, collecting rent, or addressing maintenance requests, Resident Connect has streamlined every aspect of property management.",
    },
    {
      img: "person4.jpeg",
      name: "James Smith",
      opinion: "Resident Connect has truly revolutionized how we engage with our tenants. The platform's intuitive interface makes it simple to communicate important updates, share documents, and foster a sense of community. It's not just a property management tool—it's a catalyst for building stronger tenant relationships.",
    },
    {
      img: "person5.jpeg",
      name: "Olivia Brown",
      opinion: "I'm incredibly impressed with Resident Connect's customer support team. Whenever I've had questions or encountered an issue, they've been quick to respond and resolve it. It's reassuring to know that they're dedicated to ensuring a seamless experience for their users.",
    },
    {
      img: "person6.jpg",
      name: "Daniel Lee",
      opinion: "As a property manager, Resident Connect has been a game-changer for me. It's simplified so many aspects of my job, from communicating with tenants to managing maintenance requests. Plus, the platform's analytics tools provide valuable insights that help me make data-driven decisions.",
    },
    {
      img: "person8.jpg",
      name: "Emma Wilson",
      opinion: "I can't imagine managing my properties without Resident Connect. It's saved me countless hours of administrative work and has allowed me to focus more on providing exceptional service to my tenants. It's a must-have tool for any property manager!",
    }
    
  ]
  return (
    <div>
      <section>
  <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="bg-gray-900 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
          Real Stories, Real Results
          </h2>

          <p className="hidden text-white/90 sm:mt-4 sm:block">
          With pride, we've successfully hosted over 800 residents, each with unique needs and expectations. Our commitment to excellence and dedication to providing top-notch service have earned us the trust of our clients. Discover their stories and see how we've helped them find comfort, security, and satisfaction in their living spaces.
          </p>

          
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />

        <img
          alt=""
          src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />
      </div>
    </div>
  </div>
</section>
<section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    Trusted by Thousands: Hear What Our Users Have to Say
    </h2>

    <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
      
        {temoins.map((Temoin,index)=>(
          <div key={index} className="mb-8 sm:break-inside-avoid">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src={Temoin.img}
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

              <p className="mt-0.5 text-lg font-medium text-gray-900">{Temoin.name}</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
           {Temoin.opinion}
          </p>
        </blockquote>
          </div>
        ))}
        
      

      
    </div>
  </div>
</section>
    </div>
  )
}

export default Success