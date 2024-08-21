import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios';

const CreateMember = () => {
  const { user } = useStateContext();
  if (user.Type !== 'Admin') {
    return <Navigate to='/Members' />;
  }

  const [Members, setMembers] = useState([]);
  const navigate = useNavigate();
  const CINRef = useRef();
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const building_numberRef = useRef();
  const apartment_numberRef = useRef();
  const [exiError, setExiError] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get(`/users/${user.residence_id}`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    console.log(Members)
   }, [user.residence_id]);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // CIN validation
    const CINRegex = /^[A-Z]{2}\d{6}$/;
    if (!CINRef.current.value || !CINRegex.test(CINRef.current.value)) {
      errors.CIN = 'CIN should contain two uppercase letters followed by six numbers';
      isValid = false;
    }

    // First name validation
    if (!first_nameRef.current.value || !/^[A-Z]/.test(first_nameRef.current.value)) {
      errors.first_name = 'First name should start with a capital letter';
      isValid = false;
    }

    // Last name validation
    if (!last_nameRef.current.value || !/^[A-Z]/.test(last_nameRef.current.value)) {
      errors.last_name = 'Last name should start with a capital letter';
      isValid = false;
    }

    // Apartment number validation
    if (!apartment_numberRef.current.value || apartment_numberRef.current.value <= 0) {
      errors.apartment_number = 'Apartment number should be a positive number';
      isValid = false;
    }

    // Building number validation
    if (!building_numberRef.current.value || building_numberRef.current.value <= 0) {
      errors.building_number = 'Building number should be a positive number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }
    
    if (Members.some(member => 
      Number(member.num_app) === Number(apartment_numberRef.current.value.trim()) && 
      Number(member.num_imm) === Number(building_numberRef.current.value.trim())
    )) {
      setExiError('There is another member with the same apartment and building number.');
      return;
    }
    

    const payload = {
      CIN: CINRef.current.value,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      building_number: building_numberRef.current.value,
      apartment_number: apartment_numberRef.current.value,
      residence_id: user.residence_id
    };

    try {
      await axiosClient.post("/createUser", payload);
      navigate('/Members', { state: { message: 'New user created successfully' } });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto bg-white rounded shadow-lg p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Create Member</h2>
        
        <div className="mb-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> The first name and last name should start with a capital letter. 
            By default, the username will be <strong>Firstname.Lastname</strong> and the password will be <strong>FirstnameLastname</strong>.
          </p>
        </div>
        
        {exiError && <p className="text-red-600 mb-4">{exiError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
            <div>
              <label htmlFor="CIN" className="block font-medium">CIN</label>
              <input
                type="text"
                id="CIN"
                ref={CINRef}
                placeholder="AA123456"
                className={`h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 ${errors.CIN && 'border-red-500'}`}
              />
              {errors.CIN && <p className="text-red-500">{errors.CIN}</p>}
            </div>
            <div>
              <label htmlFor="first_name" className="block font-medium">First Name</label>
              <input
                type="text"
                id="first_name"
                ref={first_nameRef}
                placeholder="First Name"
                className={`h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 ${errors.first_name && 'border-red-500'}`}
              />
              {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
            </div>
            <div>
              <label htmlFor="last_name" className="block font-medium">Last Name</label>
              <input
                type="text"
                id="last_name"
                ref={last_nameRef}
                placeholder="Last Name"
                className={`h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 ${errors.last_name && 'border-red-500'}`}
              />
              {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
            </div>
            <div>
              <label htmlFor="apartment_number" className="block font-medium">Apartment Number</label>
              <input
                type="number"
                id="apartment_number"
                ref={apartment_numberRef}
                className={`h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 ${errors.apartment_number && 'border-red-500'}`}
              />
              {errors.apartment_number && <p className="text-red-500">{errors.apartment_number}</p>}
            </div>
            <div>
              <label htmlFor="building_number" className="block font-medium">Building Number</label>
              <input
                type="number"
                id="building_number"
                ref={building_numberRef}
                className={`h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 ${errors.building_number && 'border-red-500'}`}
              />
              {errors.building_number && <p className="text-red-500">{errors.building_number}</p>}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Create
            </button>
            <Link to="/Members" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
