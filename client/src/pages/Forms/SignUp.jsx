import { useRef, useState } from 'react';
import axiosClient from '../../api/axios';
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';



const SignUp = () => {
const navigate = useNavigate()
    const CINRef=useRef();
    const first_nameRef=useRef();
    const last_nameRef=useRef();
    const usernameRef=useRef();
    const phoneRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef()
    const password_confirmationRef=useRef()
    const building_numberRef=useRef()
    const apartment_numberRef=useRef()
    const residence_nameRef=useRef()

  const {setUser, setToken,token} = useStateContext();
  const Submit = async (ev) => {
    ev.preventDefault();

    // Form validation logic goes here

    const payload = {
      CIN: CINRef.current.value,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      building_number: building_numberRef.current.value,
      apartment_number: apartment_numberRef.current.value,
      residence_name: residence_nameRef.current.value,
    };

    try {
        const { data } = await axiosClient.post("/register", payload);
        setUser(data.user);
        setToken(data.token);

        navigate('/Home'); 
        
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log(error.response.data.errors);
        } else {
            console.error('An error occurred:', error);
        }
    }
};

if(token){
  return <Navigate to='/Home'/>
}

  return (
    <form onSubmit={Submit} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>

        <input
          type="text"
          id="FirstName"
          name="first_name"
          placeholder='John'
          ref={first_nameRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
     

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>

        <input
          type="text"
          id="LastName"
          name="last_name"
          placeholder='Doe'
          ref={last_nameRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          CIN
        </label>

        <input
          type="text"
          id="CIN"
          name="CIN"
          placeholder='AA123456'
          ref={CINRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          Username
        </label>

        <input
          type="text"
          id="Username"
          name="username"
          placeholder='Username'
         ref={usernameRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          phone number
        </label>

        <input
          type="text"
          id="phone"
          name="phone"
          placeholder='06********'
          ref={phoneRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
      <div className="col-span-6">
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

        <input
          type="email"
          id="Email"
          name="email"
          ref={emailRef}
          placeholder='John@exemple.com'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

        <input
          type="password"
          id="Password"
          name="password"
         ref={passwordRef}
          placeholder='password'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
          Password Confirmation
        </label>

        <input
          type="password"
          id="PasswordConfirmation"
          name="password_confirmation"
          ref={password_confirmationRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
          autoComplete="new-password"
        />

      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
        Building N°
        </label>

        <input
          type="Number"
          id="BuildingN°"
          name="building_number"
          placeholder='Building N°'
          ref={building_numberRef}
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          Appartement N°
        </label>

        <input
          type="number"
          id="AppartementN°"
          name="apartment_number"
          ref={apartment_numberRef}
          placeholder='Appartement N°'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>
      <div className="col-span-6">
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Environement Name</label>

        <input
          type="text"
          id="envName"
          ref={residence_nameRef}
          name="residence_name"
          placeholder='Residence name'
          className="mt-1 block w-full h-8 rounded border-gray-300 focus:border-gray-700 focus:ring-gray-700 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button type="submit"
         className="inline-block rounded shrink-0 border border-slate-800 bg-slate-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-slate-800 focus:outline-none focus:ring active:text-blue-500"
        >
          Create an account
        </button>


      </div>
    </form>
  )
}

export default SignUp