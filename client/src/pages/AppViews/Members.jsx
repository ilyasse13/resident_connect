import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import LoadingAnim from './../../animation/Animation - 1715078718654.json';
import Lottie from 'lottie-react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { user } = useStateContext();
  const location = useLocation();
  const successMessage = location.state?.message;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get(`/users/${user.residence_id}`);
        const updatedUsers = response.data.map(use => ({
          ...use,
          image: use.image ? `http://127.0.0.1:8000/storage/${use.image}` : null
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.residence_id]);

  const handleDelete = async (Username) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setDeleting(true);
        await axiosClient.delete(`/deleteUser/${Username}`);
        setUsers(prevUsers => prevUsers.filter(item => item.Username !== Username));
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <>
      <header className='mb-5'>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Members</h1>
        </div>
        {user.Type === 'Admin' && (
          <div className="mb-5 flex justify-end">
            <Link to='/createMember' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out text-sm">
              Add Member
            </Link>
          </div>
        )}
      </header>
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
                    <Loading/>
                ) : (
                  <div className="relative overflow-x-auto">
                    <table className="table-auto w-full whitespace-nowrap">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th scope="col" className="p-2">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°appartement</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°immeuble</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          {user.Type === 'Admin' && (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((usere, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {usere.image ? (
                                    <img className="h-10 w-10 rounded-full" src={usere.image} alt={`${usere.Nom} ${user.Prenom}`} />
                                  ) : (
                                    <span className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xl" style={{ fontFamily: "monospace" }}>
                                      {`${usere.Nom.charAt(0)}${usere.Prenom.charAt(0)}`}
                                    </span>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {usere.Nom} {usere.Prenom}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{usere.num_app}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{usere.num_imm}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{usere.Type}</td>
                            {user.Type === 'Admin' && (
                              <td className="px-6 py-4 text-sm font-medium">
                                <button 
                                  onClick={() => handleDelete(usere.Username)} 
                                  className={`inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium ${usere.Type === 'Admin' ? 'hidden' : ''} text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500`}
                                  aria-label={`Delete ${usere.Nom} ${usere.Prenom}`}
                                >
                                  Delete
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Members;
