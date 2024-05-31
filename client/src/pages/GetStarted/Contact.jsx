import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Lottie from 'lottie-react';
import DoneAnimation from './../../../src/animation/Animation - 1704561935730.json'
function contact() {
  const [state, handleSubmit] = useForm("xrgnabzj");
  
 
  return (
    <section
  className="min-h-screen bg-cover mb-2 shadow"
  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}
>
      <div className="flex flex-col min-h-screen bg-black/60">
        <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
          <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
            <div className="text-white lg:w-1/2 lg:mx-6">
              <h1 className="text-2xl font-semibold capitalize lg:text-3xl">Contact us</h1>

              <p className="max-w-xl mt-6">
                Have questions or feedback? We'd love to hear from you! Feel free to reach out to our dedicated team via email, phone, or by filling out the contact form below. Whether you're looking for support, want to share your thoughts, or simply want to say hello, we're here to assist you every step of the way.
              </p>

              
            </div>

            <div className="mt-8 lg:w-1/2 lg:mx-6">
              <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
                <h1 className="text-xl font-medium text-gray-700 dark:text-gray-200">Contact form</h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Ask us everything and we would love
                  to hear from you
                </p>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="flex-1 mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input type="email" placeholder="johndoe@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                  <div className="w-full mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                    <textarea className='block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
                      id="message"
                      name="message"
                    />
                  </div>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                  <button
                    className=" w-60 rounded px-1 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                    type="submit"
                    disabled={state.submitting}
                    style={{ cursor: state.submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {state.submitting ? "sending..." : "Send"}
                  </button>
                  {state.succeeded && (
                    <p className='flex' style={{ marginTop: "1.7rem", fontSize: "18px" }}>
                      <Lottie loop={false} style={{ height: 37 }} animationData={DoneAnimation} />
                      your message has been sent successfully
                    </p>)}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default contact