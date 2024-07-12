import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axios'

const UpdatePayements = () => {
    const { user } = useStateContext()
    if (user.Type !== 'Admin') {
        return <Navigate to={'/Payement'} />
    }
    const [Members, setMembers] = useState([])
    const [payements,setPayments] = useState([])
    const [selectedMember, setSelectedMember] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const navigate = useNavigate()
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
        const fetchpayments = async () => {
          try {
            const response = await axiosClient.get(`/payements/${user.residence_id}`);
            setPayments(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchpayments();
      }, [user.residence_id]);
    const months =[
        {name: 'January',value: 'Jan'},
        {name: 'February',value: 'Feb'},
        {name: 'March',value: 'Mar'},
        {name: 'April',value: 'Apr'},
        {name: 'May',value: 'May'},
        {name: 'June',value: 'Jun'},
        {name: 'July',value: 'Jul'},
        {name: 'August',value: 'Aug'},
        {name: 'September',value: 'Sep'},
        {name: 'October',value: 'Oct'},
        {name: 'November',value: 'Nov'},
        {name: 'December',value: 'Dec'}
    ]

    const handleAddPayment = async () => {
        if (!selectedMember || !selectedMonth) {
          alert('Please select a member and a month');
          return;
        }
        const payload={
            id: selectedMember,
            mounth: selectedMonth,
            residence_id:user.residence_id
          }
          console.log(payload)
        try {
          const response = await axiosClient.post('/addPayment', payload);
          navigate('/Payement')
          
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
        <>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Update the Payments</h2>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                    <div className="md:col-span-5">
                      <label className="block mb-2 font-bold text-gray-700">Member:</label>
                      <select id="member-select"
                        name="member"
                        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}>
                            <option value="" disabled>Select a member</option>
                        {Members.map((member) => (
                          <option key={member.user_id} value={member.id}>
                            {member.Prenom} {member.Nom}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label className="block mb-2 font-bold text-gray-700">Month:</label>
                      <select  id="month-select"
                        name="month"
                        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="" disabled>Select a month</option>
                        {months.map((month, i) => (
                          <option key={i} value={month.value}>{month.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end space-x-2">
                        <button onClick={handleAddPayment} className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                          Update
                        </button>
                        <Link to='/Payement' className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                          Cancel
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Payment History Section */}
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Payment History</h3>
              <div className="">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                        Month
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payements.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {Members.find(mem => mem.id === payment.user)?.Nom} {Members.find(mem => mem.id === payment.user)?.Prenom}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {months.find(mo => mo.value === payment.mounth)?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
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
      </div>
        </>
    )
}

export default UpdatePayements