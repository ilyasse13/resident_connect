import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios';

const UpdatePayements = () => {
    const { user } = useStateContext();
    if (user.Type !== 'Admin') {
        return <Navigate to={'/Payement'} />;
    }

    const [Members, setMembers] = useState([]);
    const [payements, setPayments] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const navigate = useNavigate();

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
    }, [user.residence_id]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosClient.get(`/payements/${user.residence_id}`);
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, [user.residence_id]);

    const months = [
        { name: 'January', value: 'Jan' },
        { name: 'February', value: 'Feb' },
        { name: 'March', value: 'Mar' },
        { name: 'April', value: 'Apr' },
        { name: 'May', value: 'May' },
        { name: 'June', value: 'Jun' },
        { name: 'July', value: 'Jul' },
        { name: 'August', value: 'Aug' },
        { name: 'September', value: 'Sep' },
        { name: 'October', value: 'Oct' },
        { name: 'November', value: 'Nov' },
        { name: 'December', value: 'Dec' }
    ];

    const handleAddPayment = async () => {
        if (!selectedMember || !selectedMonth) {
            alert('Please select a member and a month');
            return;
        }

        const payload = {
            id: selectedMember,
            mounth: selectedMonth,
            residence_id: user.residence_id
        };

        try {
            await axiosClient.post('/addPayment', payload);
            navigate('/Payement');
        } catch (error) {
            console.error('Error adding payment:', error);
            alert('Failed to add payment');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this payment?');
        if (!confirmDelete) return;

        try {
            await axiosClient.delete(`/deletePayement/${id}`);
            setPayments(payements.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-full sm:max-w-screen-sm lg:max-w-screen-md mx-auto">
                <div className="bg-white rounded shadow-md p-4 sm:p-6 lg:p-8 mb-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Update Payments</h2>
                    <div className="grid gap-2 sm:gap-4 text-sm sm:text-base grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block mb-1 sm:mb-2 font-semibold text-gray-700">Member:</label>
                            <select
                                id="member-select"
                                name="member"
                                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                            >
                                <option value="" disabled>Select a member</option>
                                {Members.map((member) => (
                                    <option key={member.user_id} value={member.id}>
                                        {member.Prenom} {member.Nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 sm:mb-2 font-semibold text-gray-700">Month:</label>
                            <select
                                id="month-select"
                                name="month"
                                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="" disabled>Select a month</option>
                                {months.map((month, i) => (
                                    <option key={i} value={month.value}>{month.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="text-right md:col-span-2">
                            <div className="inline-flex items-center space-x-2">
                                <button
                                    onClick={handleAddPayment}
                                    className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded text-sm sm:text-base"
                                >
                                    Update
                                </button>
                                <Link
                                    to='/Payement'
                                    className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded text-sm sm:text-base"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment History Section */}
                <div className="bg-white rounded shadow-md p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Payment History</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs font-semibold text-left text-gray-500 uppercase">User</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-left text-gray-500 uppercase">Month</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-left text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {payements.map((payment, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                                            {Members.find(mem => mem.id === payment.user)?.Nom} {Members.find(mem => mem.id === payment.user)?.Prenom}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                                            {months.find(mo => mo.value === payment.mounth)?.name}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(payment.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-sm sm:text-base"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePayements;
