import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Tags from '../Tags/Tags';
import Posts from '../Posts/Posts';
import useAnnouncement from '../Hooks/useAnnouncement';

const Home = () => {
  const [announce,refetch]=useAnnouncement();
  useEffect(()=>{
    refetch();    
  })
    return (
        <div>
          <div>
            <Header></Header>
          </div>
          <div>
            <Tags></Tags>
          </div>
          <div className='p-8'>
            <Posts></Posts>
          </div>
        </div>
    );
};

export default Home;