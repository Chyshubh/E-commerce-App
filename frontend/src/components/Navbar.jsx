import React, { useContext } from 'react'
import { assets } from '/src/assets/frontend_assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const { setShowSearch, getKartCount, navigate, token, setToken, setKartItems } = useContext(ShopContext);

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setKartItems({})
        navigate('/login')
    }
    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <li>
                    <NavLink to="/" className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/collection" className='flex flex-col items-center gap-1'>
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className='flex flex-col items-center gap-1'>
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className='flex flex-col items-center gap-1'>
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </li>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                   <img onClick={()=> token ? null : navigate('/login') } src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {/* Dropdown Menu*/}
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                           <p onClick={()=>navigate('/my-profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>}
                   
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getKartCount()}</p>
                </Link>
                <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

                <div className={` ${showMenu ? 'w-full fixed' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/collection'><p className='px-4 py-2 rounded inline-block'>COLLECTION</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
