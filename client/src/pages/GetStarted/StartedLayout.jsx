import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import {Navigate, Outlet} from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'

const StartedLayout = () => {
  const {token}= useStateContext()
  const [scroll,setScroll]=useState(false)
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY>17){
        setScroll(true)
      }else{
        setScroll(false)
      }
    })
  },[])
  if(token){
    return <Navigate to='/Home'/>
  }
  return (
   <>
   <div id='up'/>
   <Header/>
   <Outlet/>
   <Footer/>
   <a href="#up" className="scroll-to-top fixed bottom-5 right-5 bg-white  text-slate-800 px-4 py-2 rounded-full shadow-md hover:bg-slate-700 hover:text-white " style={{opacity:scroll? 1 : 0,transition:" 0.4s"}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
</a>
   </>
  )
}

export default StartedLayout