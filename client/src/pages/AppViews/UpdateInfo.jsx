import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';

const UpdateInfo = () => {
  const navigate = useNavigate();
  const { user,setUser } = useStateContext();
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    cin: user.user_id || '',
    firstName: user.Prenom || '',
    lastName: user.Nom || '',
    username: user.Username || '',
    oldPassword: '',
    newPassword: '',
    newPassword_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // CIN validation: Starts with 2 capital letters followed by 6 digits
    const cinPattern = /^[A-Z]{2}\d{6}$/;
    if (!cinPattern.test(formData.cin)) {
      isValid = false;
      errors.cin = 'CIN must start with 2 capital letters followed by 6 digits';
    }

    // First Name and Last Name validation: Should start with a capital letter
    const namePattern = /^[A-Z][a-zA-Z]*$/;
    if (!namePattern.test(formData.firstName)) {
      isValid = false;
      errors.firstName = 'First Name must start with a capital letter';
    }
    if (!namePattern.test(formData.lastName)) {
      isValid = false;
      errors.lastName = 'Last Name must start with a capital letter';
    }

    // Password validation
    if (formData.newPassword && formData.newPassword !== formData.newPassword_confirmation) {
      isValid = false;
      errors.newPassword_confirmation = 'New Password and Confirm Password do not match';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare data to be sent
        const updateData = {
          ...formData,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        };

        // Send data to the backend
        const response = await axiosClient.put(`/updateUser/${user.id}`, updateData);

        if (response.status === 200) {
          const updatedUser = response.data.user;

          // Update local storage
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Update context or state if you are using one
          setUser(updatedUser); // Assuming you have a setUser function from a context

          navigate('/profile'); // Redirect on success
        } else {
          setError('An unexpected error occurred');
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error updating information');
      }
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-start">
        Update Your Information
      </h2>
      <div className="max-w-3xl mx-auto bg-slate-50 p-6 rounded shadow-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
          Please review and update your personal information. Fields for the old and new password are optional; only fill them in if you wish to change your password.
        </p>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="mb-5">
            <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              CIN
            </label>
            <input
              type="text"
              id="cin"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              required
              className={`bg-gray-50 border ${formErrors.cin ? 'border-red-500' : 'border-gray-300'} outline-none text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600`}
            />
            {formErrors.cin && <p className="text-red-500 text-xs mt-1">{formErrors.cin}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`bg-gray-50 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} outline-none text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600`}
            />
            {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`bg-gray-50 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} outline-none text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600`}
            />
            {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600 outline-none"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Old Password <span className='text-xs text-gray-500 ml-2'>(Optional. Fill only if you wish to change your password.)</span>
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="newPassword_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="newPassword_confirmation"
              name="newPassword_confirmation"
              value={formData.newPassword_confirmation}
              onChange={handleChange}
              className={`bg-gray-50 border ${formErrors.newPassword_confirmation ? 'border-red-500' : 'border-gray-300'} outline-none text-gray-900 text-sm rounded focus:ring-green-600 focus:ring-1 focus:border-green-600 block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600`}
            />
            {formErrors.newPassword_confirmation && <p className="text-red-500 text-xs mt-1">{formErrors.newPassword_confirmation}</p>}
          </div>
          
          <div className="flex justify-between mb-5">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium rounded text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-medium rounded text-sm px-5 py-2.5 dark:bg-red-500  dark:hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateInfo;



