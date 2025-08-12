import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    role: 'candidate',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', formData, { withCredentials: true });
      if (response.status === 201 && response.data.user) {
        navigate(`/${response.data.user.role}`);
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl">
            Create an account
          </h2>
        </div>

        <div className="relative max-w-md mx-auto mt-3 md:mt-8">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your full name"
                      className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="mobileNumber" className="text-base font-medium text-gray-900">Mobile number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      placeholder="10-digit mobile number"
                      className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter a strong password"
                      className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="text-base font-medium text-gray-900">Role</label>
                    <select
                      name="role"
                      id="role"
                      className="block w-full mt-2.5 py-3 pl-3 pr-10 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="candidate">Candidate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Register
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link className="text-blue-600 hover:underline" to="/">Log in</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


