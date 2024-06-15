import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import useAnnouncement from '../Hooks/useAnnouncement';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [announce, refetch] = useAnnouncement();
  
  const logoutHandler = (e) => {
    e.preventDefault();
    logout()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navItem = (
    <div className='flex gap-3'>
      <li><NavLink to={'/'} activeClassName="active" className={'bg-black text-white btn btn-sm nav-link'}>Home</NavLink></li>
      <li><NavLink to={'/membership'} activeClassName="active" className={'bg-black text-white btn btn-sm nav-link'}>Membership</NavLink></li>
      <li><NavLink className={'btn bg-black text-white btn-sm nav-link '} activeClassName="active" to={'/notification'}>
        <i className="bg-black text-white fa-solid fa-bell">
          <div className="badge badge-sm mx-1">{announce.length}</div>
        </i>
      </NavLink></li>
    </div>
  );

  return (
    <div className=''>
      <div className="navbar fixed max-h-2 z-10 opacity-60 bg-orange-100 max-w-screen-full mx-auto text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52">
              {navItem}
            </ul>
          </div>
          <img src={'/opinion.jpg'} className='w-12 h-12 rounded-3xl border-2 border-orange-400' alt="" />
          <a className="font-semibold text-3xl ml-5 text-orange-600">Opinion Loom</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {user?.email ? (
            <div className={`dropdown`}>
              <div tabIndex={0} role="button" className='btn w-16 h-16 rounded-full '>
                <img className='max-w-14 max-h-14 rounded-full' src={user.photoURL} alt="" />
              </div>
              <ul tabIndex={0} className="dropdown-content gap-1 -left-40 dropdown-left z-[1] menu px-1 shadow bg-base-100 rounded-box">
                <li><NavLink className={'flex justify-center btn-disabled text-center'}>{user?.displayName}</NavLink></li>
                <li><NavLink to={'/dashboard'} className={'bg-black text-white btn btn-sm nav-link'}>Dashboard</NavLink></li>
                <li className='list-none'><a onClick={logoutHandler} className={'bg-black text-white btn btn-sm nav-link'}>Log out</a></li>
              </ul>
            </div>
          ) : (
            <>
              <li className='list-none'><NavLink activeClassName="active" className={'bg-black text-white nav-link btn btn-sm'} to={'/joinus'}>Join Us</NavLink></li>
              <li className='list-none'><NavLink activeClassName="active" className={'bg-black text-white nav-link btn btn-sm'} to={'/login'}>Log in</NavLink></li>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
