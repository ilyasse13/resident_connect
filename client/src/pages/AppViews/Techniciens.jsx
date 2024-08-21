import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../../api/axios';
import LoadingAnim from './../../animation/Animation - 1715078718654.json';
import Lottie from 'lottie-react';
import Loading from '../../components/Loading';

const Techniciens = () => {
  const [metiers, setMet] = useState([]);
  const [technicians, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const { user } = useStateContext();
  const location = useLocation();
  const successMessage = location.state?.message; // Optional chaining for safety

  const metierspic = [
    { id: 1, image: 'Electrician.jpeg' },
    { id: 2, image: 'plombier.jpg' },
    { id: 3, image: 'mecanique.jpg' }
  ];

  useEffect(() => {
    const fetchMet = async () => {
      try {
        const response = await axiosClient.get('/metiers');
        setMet(response.data);
      } catch (error) {
        console.error('Error fetching métiers:', error);
      }
    };

    fetchMet();
  }, []);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const response = await axiosClient.get(`/technicians/${user.residence_id}`);
        setTechs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setLoading(false);
      }
    };

    fetchTech();
  }, [user.residence_id]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this technician?');
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/deletetech/${id}`);
      setTechs(technicians.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting technician:', error);
    }
  };

  return (
    <section className="bg-white -m-3 -ml-6 dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Our Technicians
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
          Discover trusted technicians recommended by your residence's admin, simplifying your search for reliable service providers.
        </p>

        {user.Type === 'Admin' && (
          <div className="mb-5 flex justify-end">
            <Link
              to='/AddTech'
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out text-sm"
            >
              Add Tech
            </Link>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <section className="antialiased text-gray-600">
          <div className="flex flex-col justify-center h-full">
            <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className='-mt-44'>
                      <Loading/>
                    </div>
                   
                  ) : (
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Phone</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Job</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center"></div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {technicians.map((technician, index) => (
                          <tr key={index}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-16 h-16 flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="rounded-full h-14 w-16"
                                    src={metierspic.find(job => job.id === technician.id_metier)?.image}
                                    alt="Technician"
                                  />
                                </div>
                                <div className="font-medium text-gray-800">
                                  {technician.Nom} {technician.Prenom}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{technician.Telephone}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left font-medium text-green-500">
                                {metiers.find(job => job.id === technician.id_metier)?.nom_metier}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center">
                                {user.Type === 'Admin' && (
                                  <button
                                    onClick={() => handleDelete(technician.id)}
                                    onMouseEnter={() => setIsDeleteHovered(true)}
                                    onMouseLeave={() => setIsDeleteHovered(false)}
                                    className={`inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium mt-4 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring hover:bg-red-600 hover:text-gray-100 active:bg-red-500`}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Techniciens;
