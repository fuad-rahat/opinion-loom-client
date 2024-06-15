// MyProfile.js
import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import useUsers from '../Hooks/useUsers';
import usePosts from '../Hooks/usePosts';
import Example from './Example';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [users, refetch] = useUsers();
  const [posts] = usePosts();

  const match = users.filter(a => a?.email === user?.email);
  const comments = posts?.reduce((a, c) => {
    return a + c.comments.length;
  }, 0);

  const data = [
    { name: 'Posts', value: posts.length },
    { name: 'Comments', value: comments },
    { name: 'Users', value: users.length },
  ];

  return (
    <div className='pt-20'>
      <div className='flex justify-evenly'>
        <div>
          <p className='text-4xl'>Name: {match[0]?.displayName}</p>
          <p className='text-2xl'>Email: {match[0]?.email}</p>
          <p className='text-2xl'>Badge: {match[0]?.badge}</p>
        </div>
        <div>
          <img src={user?.photoURL} className='w-32 h-32 rounded-2xl' alt="User Profile" />
        </div>
      </div>
      <div className='flex flex-col mt-10 items-center'>
        <p className='text-2xl text-orange-400'>Last 3 posts</p>
        {posts.slice(0, 3).reverse().map((post, index) => (
          <div key={post._id}>
            <p>Post {index + 1} : {post.postTitle}</p>
          </div>
        ))}
      </div>
      <div>
        {match[0]?.role === 'admin' && (
          <div className='p-5'>
            <div>
              <p className='text-2xl'>Number of Posts: {posts.length}</p>
              <p className='text-2xl'>Number of Users: {users.length}</p>
              <p className='text-2xl'>Number of Comments: {comments}</p>
            </div>
            <div className='my-5 '>
                <p className=' text-xl text-orange-400'>Pie Chart Based on total user,total post and total comments:</p>
              <Example data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
