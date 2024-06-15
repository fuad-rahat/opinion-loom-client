import React, { useEffect, useState } from 'react';
import useAxiosSecure, { axiosSecure } from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useUsers from '../../Hooks/useUsers';

const ManageUsers = () => {
    const axiosSecure= useAxiosSecure();
   const [users,refetch]=useUsers();
    const makeAdminHandler=(id)=>{
        console.log(id);
        axiosSecure.patch(`/users/admin/${id}`)
        .then(res=>{
            if(res.data.modifiedCount > 0)
            {
                refetch();
                Swal.fire({
                    title: "Admin Creation",
                    text: "Admin created successfully",
                    icon: "success"
                  });
            }
        })
        .then((error)=>{
            console.log(error.message);
        })
    }
    return (
        <div className=' pt-24'>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Membership Status</th>
      </tr>
    </thead>
    <tbody>
      
      {/* row 2 */}
      {
        users.map((person,index)=><tr key={person._id} className="hover">
        <th>{index+1}</th>
        <td>{person.displayName}</td>
        <td>{person.email}</td>
        <td>{person?.role==='admin' ? <p>{person.role}</p>:<p onClick={()=>makeAdminHandler(person._id)} className='btn '>Make Admin</p>}</td>
        <td>{person?.membership ? <p>{person.membership}</p>:<p>Not Available</p>}</td>
      </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUsers;