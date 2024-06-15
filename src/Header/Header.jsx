import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import support from '/Projects/OpinionLoom/public/support.json';
import Lottie from 'lottie-react';
import usePosts from '../Hooks/usePosts';
import { Link, useNavigate } from 'react-router-dom';

const style = {
  height: 400,
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts] = usePosts(searchQuery);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className='relative'>
      <div className="hero flex justify-center min-h-screen bg-[url('/public/two.jpg')]">
        <div className="hero-content text-center rounded-3xl">
          <div className="max-w-xl relative">
            <h1 className="text-8xl w-full font-bold text-orange-400">Hello there</h1>
            <p className="py-2 text-orange-400 text-xl font-bold">Start connecting with people who share your interests.</p>
            <TypeAnimation
              className='w-full'
              sequence={[
                'The community to share your thoughts and queries',
                1000,
                'The community to express your mind',
                1000,
              ]}
              speed={80}
              style={{ fontSize: '1.2em', color: 'white', backgroundColor: 'orange' }}
              repeat={Infinity}
            />
            <div className="relative mt-5">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search"
                className="input rounded-r-none w-28 md:w-auto"
              />
              {searchQuery && posts.length > 0 && (
                
                <div className="absolute left-20 right-0 mt-1 max-w-[22rem] bg-white shadow-lg rounded-md overflow-hidden overflow-y-auto">
                  {posts.map(post => (
                    <div
                      key={post._id}
                      className="cursor-pointer border-2 text-start pl-3 border-green-500 p-2 hover:bg-gray-100"
                      onClick={() => handlePostClick(post._id)}
                    >
                      {post.postTitle}
                    </div>
                  ))}
                </div>
              )}
              <button className='btn border-none text-white text-lg bg-orange-500 rounded-l-none'>Get Started</button>
            </div>
          </div>
        </div>
        <div className=''>
          <Lottie style={style} className='rounded-3xl' animationData={support} />
        </div>
      </div>
    </div>
  );
};

export default Header;
