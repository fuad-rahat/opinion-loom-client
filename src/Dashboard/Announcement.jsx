import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQueryClient } from '@tanstack/react-query';

const Announcement = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient(); // Use React Query's useQueryClient

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Set loading state to true
        try {
            const photoURL = user?.photoURL;
            const displayName = user?.displayName;
            const announcementDescription = data.announcementDescription;
            const announcementTitle = data.announcementTitle;

            const announce = { photoURL, displayName, announcementDescription, announcementTitle };

            const res = await axiosSecure.post('/announce', announce); // Use async/await for post request
            console.log(res.data);

            // Invalidate the 'announce' query to re-fetch the updated data
            queryClient.invalidateQueries('announce');

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Announcement published',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error(error);
            // Handle error, show error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    return (
        <div className='pt-20'>
            <p className='text-4xl text-center text-orange-400'>Announcement</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-5 justify-evenly '>
                    <div className='flex-1'>
                        <p>Author Image</p>
                        <input type="text" disabled defaultValue={user?.photoURL} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex-1'>
                        <p>Author Name</p>
                        <input type="text" disabled defaultValue={user?.displayName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <div className='flex justify-evenly '>
                    <div className='w-full'>
                        <p>Announcement Title</p>
                        <input type="text" {...register("announcementTitle")} placeholder="Type your Announcement here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <div className='max-w-4xl flex flex-col justify-center'>
                    <p>Announcement Description</p>
                    <textarea {...register("announcementDescription")} className="textarea textarea-lg max-w-2xl w-full textarea-accent" placeholder="Description..."></textarea>
                </div>
                <div className='flex justify-center mt-3'>
                    <input type="submit" value="Post Announcement" className='btn btn-md bg-orange-400 text-white' />
                </div>
            </form>
        </div>
    );
};

export default Announcement;
