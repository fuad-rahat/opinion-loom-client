import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const {login,googleSign}=useContext(AuthContext);
    const axiosSecure= useAxiosSecure();
    const navigate= useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

   const onSubmit=(data)=>{
         login(data.email,data.password)
         .then((userCredential)=>{
            const user = userCredential.user;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Welcome to your own community ${user.displayName}`,
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/');
         })
         .catch((error)=>{
            console.log(error.message);
         })
   }

   const googleSigninHandler=()=>{
    googleSign()
    .then(async(res)=>{
        const user=res.user;
        const userInfo={
          displayName:user.displayName,
          email:user.email
      }
        const pes= await axiosSecure.post('/users',userInfo);
                    console.log(pes.data);
                    navigate('/');
    })
    .catch((error)=>{
        console.log(error.message);
    })
   }
    return (
        <div className='pt-16'>
           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Please log in first to enter your own community</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="Enter your email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="Enter your password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
            <input type="submit" value="Log in" className=' btn bg-orange-500 text-white' />        </div>
            <div>
        <div className='btn' onClick={googleSigninHandler}>Google <i className="fa-brands fa-google"></i></div>
      </div>
      </form>
      <div className='flex flex-col justify-center items-center'>
      Don't you have an account?<br />
           <span><Link to={'/joinus'} className=' text-xl text-red-500 font-semibold '>Register</Link> Now</span>  
            </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default LogIn;