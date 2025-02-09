import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/headers/Social/GoogleLogin';
import { AuthContext } from '../../ultilities/providers/AuthProvider';
import axios from 'axios';
import { updateProfile } from "firebase/auth"; // Import updateProfile from Firebase

const Register = () => {
    const navigate = useNavigate();
    const { signUp, setError } = useContext(AuthContext); // Removed updateUser, will handle this inside
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        signUp(data.email, data.password).then((result) => {
            const user = result.user;
            if (user) {
                // Use updateProfile method to update user profile in Firebase
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: data.photoUrl
                })
                .then(() => {
                    const userImp = {
                        name: user?.displayName,
                        email: user?.email,
                        photoURL: user?.photoURL || 'default-avatar-url.jpg',
                        role: 'user',
                        gender: data.gender,
                        phone: data.phone,
                        address: data.address,
                    };

                    if (user.email && user.displayName) {
                        return axios
                            .post('https://yoga-master-server-slrk.onrender.com/new-user', userImp)
                            .then(() => {
                                setError("");
                                navigate('/');
                                return "Registration Successful";
                            })
                            .catch((err) => {
                                throw new Error(err);
                            });
                    }
                })
                .catch((err) => {
                    setError(err.code);
                    throw new Error(err);
                });
            }
        });
    };

    const password = watch('password', '');

    return (
        <div className='flex items-center justify-center bg-gray-100 pt-14'>
            <div className='p-8 bg-white rounded-lg shadow-md'>
                <h2 className='mb-6 text-3xl font-bold text-center'>Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlineUser className='inline-block mb-1 mr-2 text-lg' />
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                {...register("name", { required: true })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlineMail className='inline-block mb-1 mr-2 text-lg' />
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder='Enter your email address'
                                {...register("email", { required: true })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlineLock className='inline-block mb-1 mr-2 text-lg' />
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder='Enter your password'
                                {...register("password", { required: true })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="confirmPassword" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlineLock className='inline-block mb-1 mr-2 text-lg' />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder='Confirm password'
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="phone" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlinePhone className='inline-block mb-1 mr-2 text-lg' />
                                Phone
                            </label>
                            <input
                                type="tel"
                                placeholder='Enter phone number'
                                {...register("phone", { required: true })}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="photoUrl" className='block mb-2 font-bold text-gray-700'>
                                <AiOutlinePicture className='inline-block mb-1 mr-2 text-lg' />
                                Photo URL
                            </label>
                            <input
                                type="text"
                                placeholder='Photo URL'
                                {...register("photoUrl")}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                            />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="gender" className='block mb-2 font-bold text-gray-700'>
                            Gender
                        </label>
                        <select
                            {...register("gender", { required: true })}
                            className='w-full px-4 py-2 border rounded-md border-grborder focus:outline-none focus:ring focus:border-blue-300'
                        >
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="address" className='block mb-2 font-bold text-gray-700'>
                            <HiOutlineLocationMarker className='inline-block mb-1 mr-2 text-lg' />
                            Address
                        </label>
                        <textarea
                            {...register("address", { required: true })}
                            rows="3"
                            placeholder='Enter address'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                        ></textarea>
                    </div>

                    <div className='text-center'>
                        <button type='submit' className='px-4 py-2 text-white rounded-md bg-secondary hover:bg-red-500'>Register</button>
                        {errors && (
                            <div className='w-full mt-1 text-sm text-red-500'>
                                <p>{errors.confirmPassword?.message}</p>
                            </div>
                        )}
                    </div>
                </form>
                <p className='mt-4 text-center'>
                    Already have an account? <Link to="/login" className='ml-1 underline text-secondary'>Login</Link>
                </p>
                <GoogleLogin />
            </div>
        </div>
    );
};

export default Register;
