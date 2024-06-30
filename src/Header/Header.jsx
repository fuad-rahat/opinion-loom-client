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
            <h1 className= "text-5xl md:text-8xl w-full font-bold text-orange-400">Hello there</h1>
            <p className="py-2 text-orange-400 text-lg md:text-xl font-bold">Start connecting with people who share your interests.</p>
            <TypeAnimation
              className='w-full'
              sequence={[
                'The community to share your thoughts and queries',
                1000,
                'The community to express your mind',
                1000,
              ]}
              speed={50}
              style={{ fontSize: '1.1em', color: 'white', backgroundColor: 'orange' }}
              repeat={Infinity}
            />
            <div className="relative flex mt-5">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search"
                className="input rounded-r-none w-20 md:w-52 inline-flex"
              />
             <button className='btn border-none inline-flex text-white md:text-lg bg-orange-500 rounded-l-none'>Get Started</button>

              {searchQuery && posts.length > 0 && (
                
                <div className="absolute  top-12 max-w-[22rem]  shadow-lg rounded-md overflow-hidden overflow-y-auto">
                  {posts.map(post => (
                    <div
                      key={post._id}
                      className=" my-1 cursor-pointer leading-5 border-2 text-start rounded-lg pl-3 bg-slate-200 border-green-500 p-2 hover:bg-orange-400 hover:text-white"
                      onClick={() => handlePostClick(post._id)}
                    >
                      {post.postTitle}
                    </div>
                  ))}
                </div>
              )}
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
