import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useTags from '../Hooks/useTags';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import usePosts from '../Hooks/usePosts';
import { Link, useNavigate } from 'react-router-dom';
import useUsers from '../Hooks/useUsers';

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const animatedComponents = makeAnimated();
  const [posts] = usePosts();
  const [tags] = useTags();
  const [users] = useUsers();
  const navigate = useNavigate();
  const filter = users.filter(item => item?.email === user?.email);
  const filter2 = posts.filter(item => item?.email === user?.email);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [selectedTags, setSelectedTags] = useState([]); // State to manage selected tags

  const tagOptions = tags.map(tag => ({
    value: tag._id,
    label: tag.tag
  }));

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postTitle: '',
      description: '',
      tags: [],
      photoURL: user?.photoURL || '',
      displayName: user?.displayName || '',
      email: user?.email || ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true); // Set loading state to true
    try {
      // Check if the user can add more posts
      if (filter2.length < 5 || filter[0]?.badge === 'gold') {
        data.timestamp = new Date().toISOString();
        data.photoURL = user?.photoURL;
        data.displayName = user?.displayName;
        data.email = user?.email;
        data.upVote = 0;
        data.downVote = 0;
        data.comments = [];

        data.tags = selectedTags.map(tag => ({ _id: tag.value, tag: tag.label }));

        const res = await axiosSecure.post('/posts', data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Post completed',
          showConfirmButton: false,
          timer: 1500
        });

        // Reset form values to their default state
        reset({
          postTitle: '',
          description: '',
          tags: []
        });

        // Reset the state of selected tags
        setSelectedTags([]);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'You have reached your limit',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/membership');
      }
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
    <div className='pt-24'>
      <div className=' max-w-5xl mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-2 justify-evenly '>
            <div className='flex-1'>
              <p className='text-sm'>Author Image</p>
              <input type="text" disabled {...register("photoURL")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex-1'>
              <p className='text-sm'>Author Name</p>
              <input type="text" disabled {...register("displayName")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>

          <div className='flex gap-2 justify-evenly '>
            <div className='flex-1'>
              <p className='text-sm'>Author Email</p>
              <input type="email" disabled {...register("email")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex-1'>
              <p className='text-sm'>Post Title</p>
              <input type="text" {...register("postTitle")} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>

          <div className='max-w-4xl flex flex-col justify-center'>
            <p className='text-sm'>Post Description</p>
            <textarea {...register("description")} className="textarea textarea-lg max-w-2xl w-full textarea-accent" placeholder="Bio"></textarea>
          </div>

          <div className='max-w-[42rem]'>
            <p className='text-sm'>Tags</p>
            <div>
              <Select 
                components={animatedComponents}
                value={selectedTags}
                isMulti
                options={tagOptions}
                onChange={(selectedOptions) => {
                  setValue('tags', selectedOptions);
                  setSelectedTags(selectedOptions);
                }}
              />
            </div>
          </div>

          <div className='flex gap-5 justify-evenly '>
            <div className='flex-1'>
              <p className='text-sm'>Up Vote</p>
              <input type="number" disabled defaultValue={0} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex-1'>
              <p className='text-sm'>Down Vote</p>
              <input type="number" disabled defaultValue={0} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
          <div className='my-5 flex justify-center'>
            {filter2.length < 5 || filter[0]?.badge === 'gold' ? (
              <input type="submit" className='btn' value="Add Post" />
            ) : (
              <Link to={'/membership'}>
                <div className='btn btn-secondary'>Become a member</div>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
