import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Providers/AuthProviders';
import useTags from '../Hooks/useTags';

const Tags = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tags,refetch]=useTags();

  useEffect(() => {
    axiosSecure.get('/users')
      .then(res => {
        setUsers(res.data);
      });

    
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  const filtered = users.filter(account => account.email === user?.email);
  const isAdmin = filtered.length > 0 && filtered[0].role === 'admin';

  const tagAdder = (e) => {
    e.preventDefault(); 

    const tag = e.target.elements.tag.value; 
    const tagInfo = { tag };

    axiosSecure.post('/tags', tagInfo)
      .then(res => {
        console.log(res.data);
        refetch();
        e.target.elements.tag.value = '';
      })
      .catch(error => {
        console.error('Error adding tag:', error);
      });
  };

  return (
    <div>
      <div>
        <p className='text-center text-5xl mt-3 font-semibold text-orange-500'>Tags</p>
        <p className='divider'></p>
        <p className='text-center text-md my-3 font-semibold text-orange-500'>ALL the tags that have been created by this community</p>
        <div className='my-5 flex gap-5 justify-center items-center max-w-3xl mx-auto'>
          {tags.map(item => (
            <p key={item._id}>{item.tag}</p>
          ))}
        </div>
        <div>
          {isAdmin && (
            <div className='my-2 flex justify-center'>
              <form onSubmit={tagAdder}>
                <input  type="text" name='tag' placeholder="Enter tag" className="input border-green-600 rounded-r-none w-28 md:w-auto" />
                <button type="submit" className="btn border-none text-white text-lg bg-orange-500 rounded-l-none">Add Tag</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;
