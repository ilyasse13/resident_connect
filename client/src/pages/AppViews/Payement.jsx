import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../api/axios';
import { Link } from 'react-router-dom';



const Payement = () => {
  const {user}= useStateContext()
  const [Members,setMembers] = useState([])
  const [payements,setPayments] = useState([])
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
  useEffect(() => {
    console.log(Members);
  }, [Members]);
  
const months=['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const currentYear = new Date().getFullYear();
  return (
    <>
   <header className='mt-5 mb-10'>
   <h2 className="text-3xl font-bold text-gray-800 mb-1">The Payment of {currentYear}</h2>
   {user.Type === 'Admin' && (
  <div className=" mb-5 flex justify-end">
    <Link to='/UpdatePayments' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out text-sm">
     Update the payements
    </Link>
  </div>
  )}  
   </header>
   <div className="flex flex-col">
  <div className="p-1.5 w-full inline-block align-middle">
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                appartement/building
              </th>
              
              {months.map((month, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Members.map((member, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {member.Nom} {member.Prenom} 
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {member.num_app}/{member.num_imm}
                </td>
                
                {months.map((month, j) => {
                  const payment = payements.find(pay => pay.mounth === month && pay.user === member.id);
                  const isPaid = payment?.state === 'paid';
                  return (
                    <td
                      key={j}
                      className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                        isPaid ? 'bg-green-100 shadow-green-200' : 'bg-red-100'
                      }`}
                    >
                      {isPaid ? 'Paid' : 'Not Paid'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>



     </>
  );
};

export default Payement;