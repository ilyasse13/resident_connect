import React from 'react';

const Why = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Resident Connect?</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
                        Discover the benefits of using Resident Connect and how it can enhance your community living experience.
                    </p>
                </div>
                <div className="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {/* Feature 1 */}
                    <div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                            {/* Icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900">Efficient Communication</h3>
                            <p className="mt-2 text-base text-gray-600">
                                Resident Connect facilitates seamless communication among community members,
                                ensuring that everyone stays informed about important updates and events.
                            </p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                            {/* Icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900">Community Engagement</h3>
                            <p className="mt-2 text-base text-gray-600">
                                Resident Connect fosters a sense of community by providing tools for organizing events,
                                sharing resources, and collaborating on neighborhood initiatives.
                            </p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                            {/* Icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 14v2m0 0V14m0 2h-2m2 0h2m-4-10V4a1 1 0 011-1h6a1 1 0 011 1v2m-8 0h6"
                                />
                            </svg>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900">User-Friendly Interface</h3>
                            <p className="mt-2 text-base text-gray-600">
                                With its intuitive design and easy-to-use features, Resident Connect simplifies
                                community management and encourages active participation from residents.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Why;
