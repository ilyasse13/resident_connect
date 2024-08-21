import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { TiHomeOutline } from "react-icons/ti";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa6";
import { AiTwotoneDollar } from "react-icons/ai";
import { useStateContext } from '../contexts/ContextProvider';

const DefaultLayout = () => {
    const { user, token } = useStateContext();
    const [active, setActive] = useState(localStorage.getItem("ActiveButton") ?? 0);
    const [open, setOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false); // New state for mobile sidebar

    const menus = [
        { nameUser: "Home", nameAdmin: 'Home', linkUser: "/Home", linkAdmin: "/Home", icon: TiHomeOutline },
        { nameUser: "Members", nameAdmin: 'Members', linkUser: "/Members", linkAdmin: "/Members", icon: IoPeopleOutline },
        { nameUser: "Messages", nameAdmin: 'Messages', linkUser: "/Messages", linkAdmin: '/Messages', icon: FiMessageSquare },
        { nameUser: "Make request", nameAdmin: 'Requests', linkUser: "/MakeRequest", linkAdmin: '/Requests', icon: TbReportAnalytics },
        { nameUser: "Technicians", nameAdmin: 'Technicians', linkUser: "/Techs", linkAdmin: '/Techs', icon: VscTools },
        { nameUser: "Calendar", nameAdmin: 'Calendar', linkUser: "/Calendar", linkAdmin: '/Calendar', icon: FaRegCalendar },
        { nameUser: "Payement", nameAdmin: 'Payements', linkUser: "/Payement", linkAdmin: '/Payement', icon: AiTwotoneDollar },
        { nameUser: "Settings", nameAdmin: 'Settings', linkUser: "/Settings", linkAdmin: '/Settings', icon: RiSettings4Line },
        { nameUser: 'Profile', nameAdmin: 'Profile', linkUser: '/Profile', linkAdmin: '/Profile', icon: AiOutlineUser }
    ];

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));

        // Handle body scroll when mobile sidebar is open
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up the effect on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [user, isMobileOpen]);

    const toggleMenu = () => {
        if (window.innerWidth < 768) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setOpen(!open);
        }
    };

    if (!token) {
        return <Navigate to='/login' />;
    }

    return (
        <section className="flex gap-3">
            {/* Sidebar for large screens */}
            <div className={`bg-slate-800 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 hidden md:block`}>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleMenu} />
                </div>
                {open && (
                    <div className="flex flex-col items-center -mt-9">
                        {user.image ? (
                            <img className="h-16 w-16 rounded-full" src={`http://127.0.0.1:8000/storage/${user.image}`} alt={`${user.Prenom} ${user.Nom}`} />
                        ) : (
                            <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-slate-800 font-bold text-xl" style={{ fontFamily: "monospace" }}>
                                {`${user.Nom.charAt(0)}${user.Prenom.charAt(0)}`}
                            </span>
                        )}
                        <span className="text-white">{user.Nom} {user.Prenom}</span>
                    </div>
                )}
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <Link
                            to={user.Type === 'Admin' ? menu?.linkAdmin : menu?.linkUser}
                            key={i}
                            onClick={() => {
                                localStorage.setItem("ActiveButton", i);
                                setActive(localStorage.getItem("ActiveButton"));
                            }}
                            className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-slate-600 ${active == i ? 'bg-gray-300 text-slate-950' : 'hover:bg-slate-600'} rounded`}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{ transitionDelay: `${i + 3}00ms` }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                            >
                                {user.Type === 'Admin' ? menu?.nameAdmin : menu?.nameUser}
                            </h2>
                            <h2
                                className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                            >
                                {user.Type === 'Admin' ? menu?.nameAdmin : menu?.nameUser}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Sidebar for mobile screens */}
            <div className={`fixed inset-y-0 left-0 bg-slate-800 text-gray-100 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50 md:hidden w-72`}>
                <div className="py-3 flex justify-end px-4">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleMenu} />
                </div>
                <div className="flex flex-col items-center -mt-9">
                    {user.image ? (
                        <img className="h-16 w-16 rounded-full" src={`http://127.0.0.1:8000/storage/${user.image}`} alt={`${user.Prenom} ${user.Nom}`} />
                    ) : (
                        <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-slate-800 font-bold text-xl" style={{ fontFamily: "monospace" }}>
                            {`${user.Nom.charAt(0)}${user.Prenom.charAt(0)}`}
                        </span>
                    )}
                    <span className="text-white">{user.Nom} {user.Prenom}</span>
                </div>
                <div className="mt-4 flex flex-col gap-4 relative px-4 overflow-y-auto flex-1">
                    {menus?.map((menu, i) => (
                        <Link
                            to={user.Type === 'Admin' ? menu?.linkAdmin : menu?.linkUser}
                            key={i}
                            onClick={() => {
                                localStorage.setItem("ActiveButton", i);
                                setActive(localStorage.getItem("ActiveButton"));
                                setIsMobileOpen(false);
                            }}
                            className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3 font-medium p-1 hover:bg-slate-600 ${active == i ? 'bg-gray-300 text-slate-950' : 'hover:bg-slate-600'} rounded`}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{ transitionDelay: `${i + 3}00ms` }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                            >
                                {user.Type === 'Admin' ? menu?.nameAdmin : menu?.nameUser}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content area */}
            <div className={`m-3 text-xl text-gray-900 flex-1 ${open ? 'md:w-10/12' : 'md:w-11/12'} h-[568px] overflow-y-auto`}>
                <Outlet />
            </div>

            {/* Menu button for mobile screens */}
            {!isMobileOpen && ( // Only show the button if the sidebar is not open
                <button
                    className="fixed top-5 left-3 z-50 md:hidden bg-slate-800 text-gray-100 p-2 rounded-full"
                    onClick={toggleMenu}
                >
                    <HiMenuAlt3 size={22} />
                </button>
            )}
        </section>
    );
};

export default DefaultLayout;
