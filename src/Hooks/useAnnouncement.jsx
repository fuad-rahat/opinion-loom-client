import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAnnouncement = () => {
    const axiosSecure= useAxiosSecure();
    const {data:announce=[],refetch}=useQuery({
        queryKey:['announce'],
        queryFn:async()=>{
              const res= await axiosSecure.get('/announce');
              return res.data;
        }
    })
    return [announce,refetch];
};

export default useAnnouncement;