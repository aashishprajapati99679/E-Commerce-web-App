import React, { useState } from 'react'
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

  const [visible, setVisible] = useState(false);

  const { getCartCount, setShowSearch, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token')
    setToken("");
    setCartItems({});
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to="/"><img src={assets.logo} alt="logo" className='w-36' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className="flex flex-col item-center gap-1">
          <p>HOME</p>
          <hr className='w-[100%] border-none h-[1.5px] bg-gray-700 hidden  ' />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col item-center gap-1">
          <p>COLLECTION</p>
          <hr className='w-[100%] border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/about" className="flex flex-col item-center gap-1">
          <p>ABOUT</p>
          <hr className='w-[100%] border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col item-center gap-1">
          <p>CONTACT</p>
          <hr className='w-[100%] border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' />
        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />

          {token &&
            <div className='group-hover:block hidden absolute right-0 dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md '>
                <p className="cursour-pointer hover:text-black">My profile</p>
                <p className="cursour-pointer hover:text-black"
                  onClick={() => navigate('/orders')}
                >Order</p>
                <p className="cursour-pointer hover:text-black" onClick={logout} >Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full text-xs flex items-center justify-center text-white'>{getCartCount()}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />

      </div>
      {/* //side bar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transation-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-greay-600 '>
          <div onClick={() => setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='  h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b border-gray-300" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b border-gray-300" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b border-gray-300" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b border-gray-300" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar