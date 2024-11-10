import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiEdit3, FiArrowLeft } from 'react-icons/fi';
import FadeLoader from 'react-spinners/FadeLoader';

const UpdateBlog = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState({
        title: '',
        content: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            axios.get(`https://bloghive-d3g9.onrender.com/blogs/${id}`, {
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                setBlog(res.data.blog);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                });
            });
        }
    }, [id]);

    const onChangeHandler = (e) => {
        setBlog({...blog, [e.target.name]: e.target.value});
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`https://bloghive-d3g9.onrender.com/blogs/${id}`, blog, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
        .then(() => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Blog Updated Successfully'
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
                <p className="text-lg font-semibold animate-pulse">Please wait, updating your blog post...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <button 
                    onClick={() => navigate('/home')}
                    className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
                >
                    <FiArrowLeft className="mr-2" /> Back to Home
                </button>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-purple-600 px-6 py-4">
                        <h1 className="text-2xl text-white font-bold flex items-center">
                            <FiEdit3 className="mr-2" /> Update Blog
                        </h1>
                    </div>
                    <form onSubmit={submitHandler} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter an engaging title"
                                name="title"
                                required
                                value={blog.title}
                                onChange={onChangeHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Content
                            </label>
                            <textarea
                                placeholder="Share your thoughts..."
                                name="content"
                                required
                                value={blog.content}
                                onChange={onChangeHandler}
                                rows="8"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                type="submit"
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;