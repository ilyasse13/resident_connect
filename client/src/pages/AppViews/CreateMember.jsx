import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axios'

const CreateMember = () => {
  const { user } = useStateContext()
  if (!user.Type === 'Admin') {
    return <Navigate to='/Members' />
  }
  const [Members,setMembers] = useState([])
  const navigate = useNavigate();
  const CINRef = useRef();
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const building_numberRef = useRef()
  const apartment_numberRef = useRef()
  const [exiError,setExiError] = useState('')
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get(`/users/${user.residence_id}`);
        setMembers(response.data);
        console.log(Members)
      } catch (error) {
        console.error('Error fetching users:', error);
        
      }
    };

    fetchUsers();
  }, []);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // CIN validation
    const CINRegex = /^[A-Z]{2}\d{6}$/;
    if (!CINRef.current.value || !CINRegex.test(CINRef.current.value)) {
      errors.CIN = 'CIN should contain two big letters followed by four numbers';
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

  const Submit = async (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }
    for(var i=0;i<=Members.length-1;i++){
      if(Members[i].num_app==apartment_numberRef.current.value && Members[i].num_imm==building_numberRef.current.value){
        setExiError('There is another member with the same apartment and building number.')
        return;
      }
    }
    const payload = {
      CIN: CINRef.current.value,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      building_number: building_numberRef.current.value,
      apartment_number: apartment_numberRef.current.value,
      residence_id: user.residence_id
    };
console.log(payload)
    try {
      const { data } = await axiosClient.post("/createUser", payload);
      navigate('/Members', { state: { message: 'New user created successfully' } });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  return (
    <>

      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>


            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                {exiError && <p className="text-red-600 mb-3">{exiError}</p>}
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
      
        <div className="md:col-span-5">
          <label>CIN</label>
          <input
            type="text"
            placeholder="AA123456"
            ref={CINRef}
            name="CIN"
            id="CIN"
            className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 ${
              errors.CIN && 'border-red-500'
            }`}
          />
          {errors.CIN && <p className="text-red-500">{errors.CIN}</p>}
        </div>
        <div className="md:col-span-5">
          <label>
            First name
            {errors.first_name && <span className="text-red-500 ml-1">{errors.first_name}</span>}
          </label>
          <input
            type="text"
            placeholder="First name"
            ref={first_nameRef}
            name="firstname"
            id="firstname"
            className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 ${
              errors.first_name && 'border-red-500'
            }`}
          />
        </div>
        <div className="md:col-span-5">
          <label>
            Last name
            {errors.last_name && <span className="text-red-500 ml-1">{errors.last_name}</span>}
          </label>
          <input
            type="text"
            name="Lastname"
            placeholder="Last name"
            ref={last_nameRef}
            id="Lastname"
            className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 ${
              errors.last_name && 'border-red-500'
            }`}
          />
        </div>

        <div className="md:col-span-5">
          <label>Apartment Number</label>
          <input
            type="number"
            name="NBuilding"
            id="NAppart"
            ref={apartment_numberRef}
            className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 ${
              errors.apartment_number && 'border-red-500'
            }`}
            placeholder=""
          />
          {errors.apartment_number && <p className="text-red-500">{errors.apartment_number}</p>}
        </div>

        <div className="md:col-span-5">
          <label>Building Number</label>
          <input
            type="number"
            name="NBuilding"
            id="NBuilding"
            ref={building_numberRef}
            className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 ${
              errors.building_number && 'border-red-500'
            }`}
            placeholder=""
          />
          {errors.building_number && <p className="text-red-500">{errors.building_number}</p>}
        </div>

        <div className="md:col-span-5 text-right">
  <div className="inline-flex items-end space-x-2">
    <button onClick={Submit} className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
      Create
    </button>
    <Link to='/Members' className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
      Cancel
    </Link>
  </div>
</div>
      </div>
    </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default CreateMember