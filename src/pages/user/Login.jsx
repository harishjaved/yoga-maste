import React, { useState } from 'react';
import { MdAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/headers/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    const { login, error, setError, loader, setLoader } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        console.log("Form submitted");  // <-- Check if the form submission is triggered

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data);

        console.log("Form data: ", formData);  // <-- Check if the data is logged

        login(formData.email, formData.password)
            .then(() => {
                console.log("Login successful"); // <-- Log after successful login
                alert("Login Successful")
                navigate(location.state?.from || '/dashboard');    
            })
            .catch((err) => {
                console.error("Login error: ", err);  // <-- Log the error
                setError(err.code);
                setLoader(false);
            });
    };

    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-center text-secondary sm:text-3xl">Get Started today</h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                Explore our comprehensive library of courses, meticulously crafted to cater to all levels of expertise.
            </p>

            <div className="max-w-lg p-4 mx-auto mt-6 mb-0 rounded-lg shadow-lg sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-lg font-medium text-center text-red-400">Sign in to your account</p>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input type="email" name="email" placeholder="Enter email" className="w-full p-4 text-sm border border-gray-200 rounded-lg shadow-sm outline-none pe-12" />
                            <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                                <MdAlternateEmail className="w-4 h-4 text-gray-400" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter Password" className="w-full p-4 text-sm border border-gray-200 rounded-lg shadow-sm outline-none pe-12" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                                <MdOutlineRemoveRedEye className="w-4 h-4 text-gray-400" />
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white rounded-lg bg-secondary">Sign in</button>
                    <p className="text-sm text-center text-gray-500">No account? <Link className="underline" to="/register">Sign up</Link></p>
                </form>
                <GoogleLogin />
            </div>
        </div>
    );
};

export default Login;
