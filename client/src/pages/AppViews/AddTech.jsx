import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const AddTech = () => {
    const [metiers, setMetier] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useStateContext();

    // Redirect if user is not an Admin
    if (user.Type !== 'Admin') {
        return <Navigate to='/Techs' />;
    }

    const first_nameRef = useRef();
    const last_nameRef = useRef();
    const phoneRef = useRef();
    const jobRef = useRef();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axiosClient.get('/metiers');
                setMetier(response.data);
            } catch (error) {
                console.error('Error fetching métiers:', error);
            }
        };

        fetchJob();
    }, []);

    const handleSubmit = async (ev) => {
        setLoading(true);
        ev.preventDefault();

        // Validate form fields
        const phoneRegex = /^06\d{8}$/;
        if (!phoneRef.current.value.match(phoneRegex)) {
            alert('Please enter a valid phone number starting with "06" and containing 10 digits.');
            setLoading(false);
            return;
        }

        const payload = {
            first_name: first_nameRef.current.value,
            last_name: last_nameRef.current.value,
            PhoneNumber: phoneRef.current.value,
            JobID: jobRef.current.value,
            residence_id: user.residence_id
        };

        try {
            await axiosClient.post("/createtech", payload);
            navigate('/Techs', { state: { message: 'New Technician Added successfully' } });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else {
                console.error('An error occurred:', error);
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label htmlFor="firstname">First name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        ref={first_nameRef}
                                        name="firstname"
                                        id="firstname"
                                        className="h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="lastname">Last name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        ref={last_nameRef}
                                        name="lastname"
                                        id="lastname"
                                        className="h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="0612345678"
                                        ref={phoneRef}
                                        name="phone"
                                        id="phone"
                                        className="h-10 border focus:outline-none focus:ring-2 focus:ring-cyan-600 mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="job">Job:</label>
                                    <select ref={jobRef} id="job" name="job" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                        {metiers.map((metier) => (
                                            <option key={metier.id} value={metier.id}>
                                                {metier.nom_metier}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? 'Adding...' : 'Add'}
                                        </button>
                                        <Link
                                            to='/Techs'
                                            className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white font-bold ml-1 py-2 px-4 rounded"
                                        >
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
    );
};

export default AddTech;
