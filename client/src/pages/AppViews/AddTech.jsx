import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

import axiosClient from '../../api/axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const AddTech = () => {
    const [metiers, setMetier] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { user } = useStateContext()
    if (!user.Type === 'Admin') {
        return <Navigate to='/Techs' />
    }
    const first_nameRef = useRef();
    const last_nameRef = useRef();
    const phoneRef = useRef();
    const jobRef = useRef()
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axiosClient.get('/metiers');
                setMetier(response.data);
                console.log(metiers)

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchJob();
    }, [])

    const Submit = async (ev) => {
        setLoading(true)
        ev.preventDefault();

        // Validate phone number format
        // const phoneRegex = /^06\d{8}$/; // Matches numbers starting with "06" followed by 8 digits
        // if (!phoneRef.current.value.match(phoneRegex)) {
        //     alert('Please enter a valid phone number starting with "06" and containing 10 digits.');
        //     return;
        // }

        // Other form validation here...
        // if (!validateForm()) {
        //     return;
        // }

        // Form data payload
        const payload = {
            first_name: first_nameRef.current.value,
            last_name: last_nameRef.current.value,
            PhoneNumber: phoneRef.current.value,
            JobID: jobRef.current.value,
            residence_id: user.residence_id
        };
        console.log(payload)
        // Submit the form data
        try {
            const { data } = await axiosClient.post("/createtech", payload);
            navigate('/Techs', { state: { message: 'New Technician Added successfully' } });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else {
                console.error('An error occurred:', error);
            }
            setLoading(false)

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
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                        <div className="md:col-span-5">
                                            <label>
                                                First name

                                            </label>
                                            <input
                                                type="text"
                                                placeholder="First name"
                                                ref={first_nameRef}
                                                name="firstname"
                                                id="firstname"
                                                className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 
                  `}
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label>
                                                Last name

                                            </label>
                                            <input
                                                type="text"
                                                name="Lastname"
                                                placeholder="Last name"
                                                ref={last_nameRef}
                                                id="Lastname"
                                                className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 
                 `}
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label>
                                                Phone Number

                                            </label>
                                            <input
                                                type='text'
                                                name="phone"
                                                placeholder="0612345678"
                                                ref={phoneRef}
                                                id="Phone"
                                                className={`h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50 `}
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="job" className="block mb-1">Job:</label>
                                            <select ref={jobRef} id="job" name="job" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                                {metiers.map((metier, index) => (
                                                    <option key={index} value={metier.id}>{metier.nom_metier}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button onClick={Submit} className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                                                    {loading ? 'adding' : 'add'}
                                                </button>
                                                <Link to='/Techs' className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white font-bold ml-1 py-2 px-4 rounded">
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

export default AddTech