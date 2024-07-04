import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProviders';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import useUsers from '../Hooks/useUsers';

const Register = () => {
  const [uploadURL, setUploadedUrl] = useState('');
  const { createUser, updateNamePhoto } = useContext(AuthContext);
  const [users,refetch]=useUsers();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.photoURL[0]);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=ced893ddad33f7eb8d843cb8cc3e6879', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result && result.data && result.data.display_url) {
        const photoURL = result.data.display_url;
        setUploadedUrl(photoURL);

        const userCredential = await createUser(data.email, data.password);
        const user = userCredential.user;
        await updateNamePhoto(data.displayName, photoURL);

        const userInfo = {
          displayName: data.displayName,
          email: data.email,
          badge: 'bronze',
          photoURL: photoURL,
        };

        const res = await axiosSecure.post('/users', userInfo);

        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.displayName} has been registered successfully`,
            showConfirmButton: false,
            timer: 1500
          });

          navigate('/');
          refetch();
        }
      } else {
        console.error('Unexpected response structure:', result);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <div className='pt-16'>
      <div className="hero max-h-full bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register to join our community!</h1>
            <p className="py-6">Express yourself. Ask what you want to know.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("displayName", { required: true })}
                  placeholder="Enter your name..."
                  className="input input-bordered"
                />
                {errors.displayName && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email..."
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="file"
                  {...register("photoURL", { required: true })}
                  placeholder="Upload your photo..."
                  className="input input-bordered"
                />
                {errors.photoURL && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="input input-bordered"
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className='btn bg-orange-500 text-white text-xl' value="Submit" />
              </div>
            </form>
            <div className='flex flex-col justify-center items-center'>
            Already Registered?<br />
           <span><Link to={'/login'} className=' text-xl text-red-500 font-semibold '>Log In</Link> Now</span>  
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
