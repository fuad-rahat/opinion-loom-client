import React, { useContext, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import useUsers from '../Hooks/useUsers';

const Dashboard = () => {
const {user}= useContext(AuthContext);
  const [users]=useUsers();
  const match=users.filter(a=> a?.email === user?.email);
console.log(match);

  return (
    <div className="flex">
      <div className="w-2/12 min-h-screen pt-20 bg-orange-400 flex flex-col">
        
          <Link
            to='/dashboard/myProfile'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            {
            match[0]?.role==='admin' ? <span>Admin</span>:<span>My</span>
            }Profile</li>
          </Link>
        
        
          <Link
            to='/dashboard/addPost'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            Add Post        </li>

          </Link>
          <Link
            to='/dashboard/myPosts'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            My Posts</li>
          </Link>
        
        {/* Admin */}
         {
            match[0]?.role === 'admin' &&
            <div>
              <Link
            to='/dashboard/manageUsers'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            Manage Users</li>
          </Link>
          <Link
            to='/dashboard/reportComments'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            Reported Comments</li>
          </Link>
          <Link
            to='/dashboard/announcement'
            className={({ isActive }) => (isActive ? 'active' : '')}
          ><li className="m-1 btn btn-sm w-[15rem]">
            Make Announcement</li>
          </Link>
            </div>
         }
        
      </div>
      <div className="w-10/12">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
