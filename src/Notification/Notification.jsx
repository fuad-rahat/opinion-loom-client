import React from 'react';
import useAnnouncement from '../Hooks/useAnnouncement';

const Notification = () => {
    const [announce,refetch]=useAnnouncement();
    return (
        <div className='flex flex-col gap-10 p-4 pt-20 '>
            {
                announce.reverse().map((an)=>
                    <div className='bg-orange-300 p-4 max-w-2xl text-white rounded-xl' key={an._id}>
                        <div className='flex gap-2'>
                            <img src={an.photoURL} className='rounded-xl w-10 h-10' alt="" />
                          <div>
                          <p>Author Name:{an.displayName}</p>
                          <p>Title: {an.announcementTitle}</p>
                          </div>
                        </div>
                        <div>
                        
                        <p>Description: {an.announcementDescription}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Notification;