import { createBrowserRouter ,Navigate } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout";
import Main from "../pages/GetStarted/Main";
import StartedLayout from "../pages/GetStarted/StartedLayout";
import Success from "../pages/GetStarted/Success";
import Security from "../pages/GetStarted/Security";
import Faq from "../pages/GetStarted/Faq";
import Tutorial from "../pages/GetStarted/Tutorial";
import NotFound from "../pages/GetStarted/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import SignUp from "../pages/Forms/SignUp";
import Why from "../pages/GetStarted/Why";
import Features from "../pages/GetStarted/Features";
import GuestLayout from "../pages/Forms/GuestLayout";
import Login from "../pages/Forms/Login";
import DashMain from "../pages/AppViews/DashMain";
import Calendar from "../pages/AppViews/Calendar";
import Payement from "../pages/AppViews/Payement";
import Request from "../pages/AppViews/AdminRequestPage";
import Members from "../pages/AppViews/Members";
import AdminRequestPage from "../pages/AppViews/AdminRequestPage";
import AddRequest from "../pages/AppViews/AddRequest";
import Settings from "../pages/AppViews/Settings";
import Profile from "../pages/AppViews/Profile";
import Techniciens from "../pages/AppViews/Techniciens";
import Messages from "../pages/AppViews/Messages";
import CreateMember from "../pages/AppViews/CreateMember";
import AddTech from "../pages/AppViews/AddTech";

const router = createBrowserRouter([
    {
      path: "/",
      element: <StartedLayout/>,
      children:[
        {
          path: "/main",
          element: <Navigate to='/'/>
        },
        {
          path: "/",
          element:<Main/>
        },
        {
          path: "/Testimonials",
          element: <Success/>
        },
        {
          path: "/Security",
          element:<Security/>
        },
        {
          path: "/FAQs",
          element:<Faq/>
        },
        {
          path:'/tuto',
          element: <Tutorial/>
        },
        {
          path:'/whyUs',
          element: <Why/>
        },
        {
          path:'/Features',
          element: <Features/>
        }
      ]
    },
    
    {
      element: <GuestLayout />,
      children: [
        {
          path: '/signup',
          element: <SignUp />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    },
    {
      path:'/',
      element:<DefaultLayout/>,
      children: [
        {
          path:'/Home',
          element:<DashMain/>
        },
        {
          path:'/Calendar',
          element:<Calendar/>
        },
        {
          path:'/Payement',
          element:<Payement/>
        },
        {
          path:'/Requests',
          element:<AdminRequestPage/>
        },
        {
          path:'/MakeRequest',
          element:<AddRequest/>
        },
        {
          path:'/Members',
          element:<Members/>
        },
        {
          path:'/Techs',
          element:<Techniciens/>
        },
        {
          path:'/Settings',
          element:<Settings/>
        },
        {
          path:'/Messages',
          element:<Messages/>
        },
        {
          path:'/Profile',
          element:<Profile/>
        },
        {
          path:'/createMember',
          element:<CreateMember/>
        },
        {
          path:'AddTech',
          element:<AddTech/>
        }
      ]
      
    },
    
    {
      path:'*',
      element:<NotFound/>
    }
    

   
  ]);
  
  export default router;