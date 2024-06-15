import React, { useState } from 'react';
import usePosts from '../Hooks/usePosts';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, refetch] = usePosts(); 
    const [visiblePosts, setVisiblePosts] = useState(5); // Initial number of posts to show

    const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const showMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5); // Increment visible posts by 7
    };

    return (
        <div className=''>
            {sortedPosts.slice(0, visiblePosts).map(post =>
               <Link key={post._id} to={`/posts/${post._id}`}>
                <div  className='border rounded-xl p-4 mb-4'>
                    <div className='flex items-center mb-2'>
                        <img src={post.photoURL} className='w-10 h-10 rounded-full' alt="User Avatar" />
                        <p className='ml-2'>{post.displayName}</p>
                    </div>
                    <div>
                    <p className='text-3xl text-orange-400 '>{post.postTitle}</p>
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
                </div></Link>
            )}
            {visiblePosts < sortedPosts.length && (
                <div className='flex justify-center mt-4'>
                    <button onClick={showMorePosts} className='btn btn-primary'>Show More</button>
                </div>
            )}
        </div>
    );
};

export default Posts;
