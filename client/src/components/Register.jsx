import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const handleOnChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/register`, user)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Registered Successfully'
                });
                navigate("/login");
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-purple-800">
                        Join Us
                    </h2>
                    <p className="mt-2 text-center text-sm text-purple-600">
                        Start your blogging journey today
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-purple-500 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-purple-400"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
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
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-purple-500 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-purple-400"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="sr-only">Confirm password</label>
                            <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-purple-500 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-purple-400"
                                placeholder="Confirm password"
                                value={user.confirmpassword}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-purple-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-purple-800 hover:text-purple-900 transition duration-300 ease-in-out">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;