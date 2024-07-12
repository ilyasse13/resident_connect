import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import { Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";

const Profile = () => {
    const { token, setUser, setToken, user } = useStateContext();
    const [admin, setAdmin] = useState({})
    const [residence, setResidence] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        image: null,
    });
    const profileMenus = ["personal info", "posts", "settings"]
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };
    const [selectedImage, setSelectedImage] = useState(null);

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

        fetchUserData();
    }, [user.id]);
    const handleLogout = async () => {
        try {
            await axiosClient.post('/logout'); // Call the logout endpoint
            setUser(null); // Clear user data
            setToken(null); // Clear token
            localStorage.removeItem('user')
            localStorage.removeItem('ActiveButton')
            return <Navigate to="/login" />;
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const [firstName, setFirstName] = useState(user.Prenom);
    const [lastName, setLastName] = useState(user.Nom);
    const [username, setUsername] = useState(user.Username);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your submit logic here
    };

    const handleUpdatePicture = async () => {
        if (!formData.image) return;

        try {
            const formDataObj = new FormData();
            formDataObj.append('image', formData.image);
            formDataObj.append('_method', 'PATCH');

            const response = await axiosClient.post(`/updateimage/${user.id}`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Update picture success');

            setUser(response.data.user) // Update the user state with the new data
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error updating picture:', error);
            // Handle error as needed (e.g., show error message)
        }
    };

    const handleDeletePicture = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete your picture?');

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axiosClient.delete(`/deleteimage/${user.id}`);
            setUser(response.data.user);
            console.log('Picture deleted successfully');
        } catch (error) {
            console.error('Error deleting picture:', error);
            // Handle error as needed (e.g., show error message)
        }
    };


    return (
        <div className="w-full gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] rounded-xl border border-slate-900">

            <div className="p-2 -mx-28 md:p-4 border-b border-slate-900">
                <div className="w-full px-4 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">

                    <div className="grid max-w-2xl mx-auto mt-5">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 ">
                        <div className='relative'>
    {user.image ? (
        <img
            className="object-cover w-40 h-40 p-1 rounded-full "
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
        <BsPencilSquare className='w-5 h-5'/>
    </button>
</div>

                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <div className="relative bg-white rounded p-6 w-full max-w-2xl">
                                        <button
                                            onClick={() => {
                                                handleCloseModal()
                                                setSelectedImage(null)
                                            }}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors duration-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        <h2 className="text-lg font-semibold">Update Image</h2>
                                        <div className="mt-4">
                                            {selectedImage ? (
                                                <img
                                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 "
                                                    src={selectedImage}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 "
                                                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div className="mt-6 flex justify-end space-x-4">
                                            <label
                                                htmlFor="image-upload"
                                                className="text-green-600 bg-white px-4 py-2 rounded cursor-pointer inline-block text-center  hover:text-green-400 transition-colors duration-300"
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
                                                onClick={
                                                    handleDeletePicture}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )

                            }

                            <div className="flex flex-col space-y-3 sm:ml-8">

                                <h1 className="text-4xl font-semibold font-inter text-slate-900 ">{user.Prenom} {user.Nom}</h1>
                                <h1 className="text-xl font-semibold font-inter text-slate-500 ">{user.Type}</h1>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div>

            </div>
            <button onClick={handleLogout}>log out</button>
        </div>

    )
}

export default Profile