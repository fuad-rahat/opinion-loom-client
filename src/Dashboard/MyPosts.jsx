import React, { useContext, useState } from 'react';
import usePosts from '../Hooks/usePosts';
import { AuthContext } from '../Providers/AuthProviders';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const [posts, refetch] = usePosts();
    const [visiblePosts, setVisiblePosts] = useState(5); // Initial number of posts to show
    const match = posts.filter(a => a?.email === user?.email);
    const sortedPosts = [...match].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const axiosSecure = useAxiosSecure();

    const showMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5); // Increment visible posts by 5
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/posts/${id}`);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Post deleted',
                showConfirmButton: false,
                timer: 1500
            });
            refetch(); // Refetch posts after deletion
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div className='pt-12'>
            <p className='text-3xl text-center font-bold text-orange-400 my-5'>My Posts</p>
            {sortedPosts.slice(0, visiblePosts).map(post =>
                <div key={post._id} className='border p-4 mb-4'>
                    <div className='flex items-center mb-2'>
                        <img src={post.photoURL} className='w-10 h-10 rounded-full' alt="User Avatar" />
                        <p className='ml-2'>{post.displayName}</p>
                    </div>
                    <div>
                        <p className='text-3xl text-orange-400'>{post.postTitle}</p>
                        <p>{post.description}</p>
                        <p>Posted: {new Date(post.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div className='flex gap-3 pt-1'>
                        <button className="">
                            <i className="fa-solid fa-thumbs-up text-xl"></i>
                            <div className="badge">{post.upVote}</div>
                        </button>
                        <button className="">
                            <i className="fa-solid fa-thumbs-down text-xl"></i>
                            <div className="badge">{post.downVote}</div>
                        </button>
                    </div>
                    <p>Comments: {post.comments.length}</p>
                    <div className='flex gap-5 my-1'>
                        <Link to={`/posts/${post._id}`} className='btn bg-orange-400 text-white'>View Post</Link>
                        <button onClick={() => handleDelete(post._id)} className='btn bg-red-600 text-white'>Delete Post</button>
                    </div>
                </div>
            )}
            {visiblePosts < sortedPosts.length && (
                <div className='flex justify-center mt-4'>
                    <button onClick={showMorePosts} className='btn btn-primary'>Show More</button>
                </div>
            )}
        </div>
    );
};

export default MyPosts;
