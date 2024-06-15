import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProviders';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const {createUser,updateNamePhoto,user}=useContext(AuthContext);
    const axiosPublic= useAxiosPublic();
    const axiosSecure= useAxiosSecure();
    const navigate= useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
   console.log(user);

      const onSubmit=(data)=>{
        
        console.log(data);
        createUser(data.email,data.password)
        .then((userCredential)=>{
            const user=userCredential.user;
                updateNamePhoto(data.displayName,data.photoURL)
                .then(async()=>{
                    const userInfo={
                        displayName:data.displayName,
                        email:data.email,
                        badge:'bronze'
                    }
                    console.log(userInfo);
                    const res= await axiosSecure.post('/users',userInfo);
                    console.log(res.data);
                    
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `${data.displayName} has been registered successfully`,
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/');
                })
           
        })
      }

    return (
        <div className=' pt-16'>
            <div className="hero max-h-full bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Registration first to join our community !</h1>
      <p className="py-6">Express yourself. Ask what you want to know</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" {...register("displayName")} placeholder="Enter your name.." className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="Enter your email.." className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="name" {...register("photoURL")} placeholder="Enter your photo url.." className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password")} type="password" placeholder="Enter your password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="submit" className='btn bg-orange-500 text-white text-xl' value="Submit" />
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;