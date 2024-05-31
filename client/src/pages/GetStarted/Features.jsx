import React from 'react';

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Post */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.586 3.414a2 2 0 112.828 2.828l-8 8a2 2 0 01-2.828 0l-8-8a2 2 0 012.828-2.828L10 10.172l4.586-4.586z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Post</h3>
          <p className="text-gray-600">Share updates, announcements, and news with the community.</p>
        </div>
      </div>

      {/* Chat */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h4l2 3V14h5a2 2 0 002-2V6a2 2 0 00-2-2H3zm8 6a1 1 0 100-2 1 1 0 000 2zm-3 0a1 1 0 100-2 1 1 0 000 2zm-3 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Chat</h3>
          <p className="text-gray-600">Communicate with other residents through real-time messaging.</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 7.414V16a1 1 0 11-2 0V7.414L5.707 9.707a1 1 0 01-1.414-1.414l5-5zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Payment History</h3>
          <p className="text-gray-600">View your payment history and transaction details.</p>
        </div>
      </div>

      {/* Calendar of Events */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 4a2 2 0 012-2h1V1h2v1h8V1h2v1h1a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm13 9h-2v2h-2v-2H7v2H5v-2H3v-2h14v2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Calendar of Events</h3>
          <p className="text-gray-600">Stay updated on upcoming events and community gatherings.</p>
        </div>
      </div>

      {/* Like and Comment */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v10a2 2 0 002 2h2.586l1.707 1.707a1 1 0 001.414 0L11.414 16H16a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 10V4h8v8H7z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Like and Comment</h3>
          <p className="text-gray-600">Interact with posts by liking and leaving comments.</p>
        </div>
      </div>

      {/* Make Demands */}
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <svg className="h-8 w-8 text-sky-950" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 2h10v4H5V6zm0 6h10v2H5v-2zm0 4h7v2H5v-2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Make Demands</h3>
          <p className="text-gray-600">Submit demands and suggestions to the management team.</p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Features;


