import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const usePosts = (searches = '') => {
  const axiosSecure = useAxiosSecure();
  const { data: posts = [], refetch } = useQuery({
    queryKey: ['posts', searches],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?searches=${encodeURIComponent(searches)}`);
      return res.data;
    },
  });
  return [posts, refetch];
};

export default usePosts;
