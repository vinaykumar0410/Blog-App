import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');

    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/home', {
          headers: { 'x-token': token }
        });
        setUser(userResponse.data.user);

        const blogsResponse = await axios.get('http://localhost:5000/blogs', {
          headers: { 'x-token': token }
        });
        setBlogs(blogsResponse.data.blogs);
      } catch (error) {
        if (error.response?.status === 404) navigate('/login');
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/blogs/${id}`, {
        headers: { 'x-token': token }
      });
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleUpdate = (blogId, authorId) => {
    if (authorId === user?._id) {
      navigate(`/updateblog/${blogId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200">
      {/* Header */}
      <div className="bg-white text-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-purple-500">
            Welcome, {user?.username || 'User'}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/createblog')}
              className="p-2 rounded-full"
              aria-label="Create new blog"
            >
              <FiPlusCircle className="w-6 h-6 text-green-500" />
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="p-2 rounded-full"
              aria-label="Logout"
            >
              <FiLogOut className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-purple-800 line-clamp-2">
                    {blog.title}
                  </h2>
                  {user?._id === blog.author && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleUpdate(blog._id, blog.author)}
                        className="p-1.5 rounded-full hover:bg-purple-50 text-purple-600 transition-colors"
                        aria-label="Edit blog"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                        aria-label="Delete blog"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content}
                </p>
                <div className="text-sm text-gray-500 italic">
                  By {blog.authorname}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
