import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import { Navigate } from 'react-router-dom';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';

const Profile = () => {
    
    const { token, setUser, setToken, user } = useStateContext();
    const [admin, setAdmin] = useState({});
    const [residence, setResidence] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [posts, setPosts] = useState([]); // State for posts
    const [error, setError] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
            handleFileChange(e);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosClient.get(`/currentuser/${user.id}`);
                setResidence(response.data.residence);
                setAdmin(response.data.admin);

            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching data');
            }
        };
        const fetchuserPosts = async () => {
            try {
                const response = await axiosClient.get(`/userposts/${user.id}`);
                setPosts(response.data);

            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching data');
            }
        }
        fetchUserData();
        fetchuserPosts();
    }, [user.id]);

    const handleLogout = async () => {
        try {
            await axiosClient.post('/logout'); // Call the logout endpoint
            setUser(null); // Clear user data
            setToken(null); // Clear token
            localStorage.removeItem('user');
            localStorage.removeItem('ActiveButton');
            return <Navigate to="/login" />;
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleUpdatePicture = async () => {
        if (!formData.image) return;

        try {
            const formDataObj = new FormData();
            formDataObj.append('image', formData.image);
            formDataObj.append('_method', 'PATCH');

            const response = await axiosClient.post(`/updateimage/${user.id}`, formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setUser(response.data.user); // Update the user state with the new data
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating picture:', error);
        }
    };

    const handleDeletePicture = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete your picture?');

        if (!isConfirmed) return;

        try {
            const response = await axiosClient.delete(`/deleteimage/${user.id}`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    };

    return (
        <div className="w-full gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] rounded-xl ">
            {/* Profile Header */}
            <div className="p-2 -mx-28 md:p-4  border-slate-900">
                <div className="w-full px-4 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <div className="grid max-w-2xl mx-auto mt-5">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            <div className='relative'>
                                {user.image ? (
                                    <img
                                        className="object-cover w-40 h-40 p-1 rounded-full"
                                        src={`http://127.0.0.1:8000/storage/${user.image}`}
                                        alt=""
                                    />
                                ) : (
                                    <FaUserCircle className="text-slate-600 dark:text-slate-900 w-40 h-40" />
                                )}
                                <button
                                    onClick={handleOpenModal}
                                    className="absolute bottom-4 right-2 bg-white text-green-600 p-1 rounded-full text-xs"
                                >
                                    <BsPencilSquare className='w-5 h-5' />
                                </button>
                            </div>

                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <div className="relative bg-white rounded p-6 w-full max-w-2xl">
                                        <button
                                            onClick={() => {
                                                handleCloseModal();
                                                setSelectedImage(null);
                                            }}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors duration-300"
                                        >
                                            <IoMdClose className="w-6 h-6" />
                                        </button>
                                        <h2 className="text-lg font-semibold">Update Image</h2>
                                        <div className="mt-4">
                                            {selectedImage ? (
                                                <img
                                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2"
                                                    src={selectedImage}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2"
                                                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div className="mt-6 flex justify-end space-x-4">
                                            <label
                                                htmlFor="image-upload"
                                                className="text-green-600 bg-white px-4 py-2 rounded cursor-pointer inline-block text-center hover:text-green-400 transition-colors duration-300"
                                            >
                                                Change Image
                                            </label>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <button
                                                onClick={handleUpdatePicture}
                                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-300"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleDeletePicture}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col space-y-3 sm:ml-8">
                                <h1 className="text-4xl font-semibold font-inter text-slate-900">{user.Prenom} {user.Nom}</h1>
                                <h1 className="text-xl font-semibold font-inter text-slate-500">{user.Type}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="w-full mt-8 py-3 px-6 bg-gray-50 rounded-lg shadow-md">
                <div className="px-4 mt-5 sm:px-0">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold leading-7 text-gray-900">Personal Information</h3>
                        <a href="/update-Info" className="flex items-center px-2 py-2 text-sm text-white bg-green-500 rounded shadow hover:bg-green-700 transition-colors duration-300 ease-in-out font-medium">
                            <FaEdit className="mr-2" />
                            Update
                        </a>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.Nom} {user.Prenom}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.Username}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.Type}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Apartment Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.num_app}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Building Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.num_imm}</dd>
                        </div>
                        {user.Type === 'Habitant' && (
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Admin</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{admin.Prenom} {admin.Nom}</dd>
                            </div>
                        )}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Residence</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{residence.nom_residence}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-8 border-slate-900" />

            {/* Posts Section */}
            <div className="w-full mt-8 px-4">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your Posts</h2>
                {posts.length > 0 ? (
                    <div className="flex flex-wrap gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.post_id}
                                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-12px)] lg:w-[calc(25%-12px)] p-4 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
                                style={{
                                    background: `linear-gradient(135deg, rgba(85,85,255,0.2) 0%, rgba(85,85,255,0.05) 100%), url('http://127.0.0.1:8000/storage/${post.image}') no-repeat center/cover`,
                                }}
                            >
                                <h3 className="text-lg font-bold text-white">{post.titre}</h3>
                                <div className="bg-white bg-opacity-75 p-2 mt-2 rounded-lg">
                                    {post.image && (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${post.image}`}
                                            alt={post.title}
                                            className="rounded-lg object-cover h-32 w-full mb-2"
                                        />
                                    )}
                                    <p className="text-gray-700 text-sm">Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">You have no posts yet.</p>
                )}
            </div>


            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 mt-6">
                Log Out
            </button>
        </div>
    );
};

export default Profile;
