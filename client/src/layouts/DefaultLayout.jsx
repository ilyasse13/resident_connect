import React, { Fragment, useEffect, useState } from 'react'
import './SidebarToggle.css'; // Import CSS file for styling
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegCalendar } from "react-icons/fa6";
import { AiTwotoneDollar } from "react-icons/ai";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";
import { GoChevronLeft } from "react-icons/go";
import { BsChevronCompactRight } from "react-icons/bs";
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useStateContext } from '../contexts/ContextProvider';

const DefaultLayout = () => {
  
  const {user,token,setToken,setUser}=useStateContext()

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  const userNavigation = [
    { name: 'Your Profile', href: '/Profile' },
    { name: 'Settings', href: '/Settings' },
    { name: 'Sign out', href: '/main' },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const [active, setActive] = useState(localStorage.getItem("ActiveButton") ?? 0);

const menus = [
    { nameUser: "Home", nameAdmin: 'Home', linkUser: "/Home", linkAdmin: "/Home", icon: TiHomeOutline },
    { nameUser: "Members", nameAdmin: 'Members', linkUser: "/Members", linkAdmin: "/Members", icon: IoPeopleOutline },
    { nameUser: "messages", nameAdmin: 'messages', linkUser: "/Messages", linkAdmin: '/Messages', icon: FiMessageSquare },
    { nameUser: "Make request", nameAdmin: 'Requests', linkUser: "/MakeRequest", linkAdmin: '/Requests', icon: TbReportAnalytics, margin: false },
    { nameUser: "Technicians", nameAdmin: 'Technicians', linkUser: "/Techs", linkAdmin: '/Techs', icon: VscTools },
    { nameUser: "Calendar", nameAdmin: 'Calendar', linkUser: "/Calendar", linkAdmin: '/Calendar', icon: FaRegCalendar },
    { nameUser: "Payement", nameAdmin: 'Payements', linkUser: "/Payement", linkAdmin: '/Payement', icon: AiTwotoneDollar, margin: false },
    { nameUser: "Settings", nameAdmin: 'Settings', linkUser: "/Settings", linkAdmin: '/Settings', icon: RiSettings4Line },
    { nameUser: 'Profile', nameAdmin: 'Profile', linkUser: '/Profile', linkAdmin: '/Profile', icon: AiOutlineUser }
];
const [open, setOpen] = useState(true);

const toggleMenu = () => {
    setOpen(!open);
};
if(!token){
  return <Navigate to='/login'/>
}




return (
    <>
      
        <section className="flex gap-3 ">
            <div
                className={`bg-slate-800 min-h-screen ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4 `}
            >

                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={toggleMenu}
                    />
                </div>
                {open && (
                    <div className="flex flex-col items-center -mt-6">
                        {user.image ? (
        <img className="h-10 w-10 rounded-full" src={image} alt={`${firstName} ${lastName}`} />
      ) : (
        <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-slate-800 font-bold text-xl" style={{fontFamily:"monospace"}}>
        {`${user.Nom.charAt(0)}${user.Prenom.charAt(0)}`}
      </span>
      )}
                        <span className="text-white">{user.Nom} {user.Prenom}</span>
                    </div>
                )}
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <Link
                            to={user.Type == 'Admin' ? menu?.linkAdmin : menu?.linkUser}
                            key={i}
                            onClick={() => {
                                localStorage.setItem("ActiveButton", i);
                                setActive(localStorage.getItem("ActiveButton"));
                            }}
                            className={`${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-600 ${active == i ? 'bg-gray-300 text-slate-950' : 'hover:bg-slate-600'} rounded`}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {user.Type === 'Admin' ? (menu?.nameAdmin) : (menu?.nameUser)}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {user.Type == 'Admin' ? (menu?.nameAdmin) : (menu?.nameUser)}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={`m-3 text-xl text-gray-900 ${open?' w-10/12' : 'w-11/12'} `}>
               <Outlet/>
            </div>
        </section>
    </>
);
};
export default DefaultLayout;