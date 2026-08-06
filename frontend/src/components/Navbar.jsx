import React, { useState, useEffect } from 'react'
import {NavLink} from "react-router-dom"
import { assets } from "../../public/assets"
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user, setUser, showUserSignin, setShowUserSignin, navigate, setSearchQuery, searchQuery} = useAppContext()

    const signout = async() => {
        setUser(null)
        navigate("/")
    }

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/all-products")
        }
    }, [searchQuery])
  
  return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to={"/"} onClick={() => setOpen(false)}>
              <img src={assets.logo} />
            </NavLink>
           

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
               <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/all-products"}>All Products</NavLink>
               <NavLink to={"/contact"}>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search"  className='w-6 opacity-80'/>
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                   <img src={assets.nav_cart_icon} alt='cart' className='w-4 h-4' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

           {!user ?( 
                 <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full" onClick={() => setShowUserSignin(true)}>
                      Signin
                </button>
           ):
           (
            <div className='relative group z-50'>
                <img src={assets.profile_icon} alt="" className='w-8' />
                <ul className='absolute right-0 top-full mt-3 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out overflow-hidden'>
                    <li onClick={() => navigate("/my-orders")} className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>My orders</li>
                    <li onClick={signout} className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>Signout</li>
                </ul>
            </div>
           )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
               <img src={assets.menu_icon} alt="" />
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
               <NavLink to={"/"} onClick={()=> setOpen(false)}>Home</NavLink>
               <NavLink to={"/all-products"} onClick={()=> setOpen(false)}>All Products</NavLink>
                <NavLink to={"/contact"} onClick={()=> setOpen(false)}>Contact</NavLink>
               {user &&
               <NavLink to={"/my-orders"} onClick={()=> setOpen(false)}>My orders</NavLink>
                }
               {!user ? (
                 <button onClick={() => {setOpen(false);  setShowUserSignin(true);}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                   Signin
                </button>
               ) : (
                 <button onClick={() => signout()} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Signout
                </button>
               )}
            </div>

        </nav>
    )

}

export default Navbar