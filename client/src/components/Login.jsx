import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`https://bloghive-d3g9.onrender.com/login`, user)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login Successful'
                });
                navigate('/home');
            })
            .catch((err) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                });
            });
    };

    if(loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 flex flex-col items-center justify-center text-white space-y-4">
                <FadeLoader color="#ffffff" />
                <p className="text-lg font-semibold animate-pulse">Please wait, logging you in...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-purple-800">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-purple-500 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-purple-400"
                                placeholder="Email address"
                                value={user.email}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-purple-500 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-purple-400"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-purple-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-purple-800 hover:text-purple-900 transition duration-300 ease-in-out">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
