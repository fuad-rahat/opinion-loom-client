import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const usePostId = (id) => {
    const axiosPublic = useAxiosPublic();
    const fetchPost = async ({ queryKey }) => {
        const [, postId] = queryKey;
        const res = await axiosPublic.get(`/posts/${postId}`);
        return res.data;
    };

    const { data: postData = {}, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: fetchPost
    });

    return [postData, isLoading, error];
};

export default usePostId;
