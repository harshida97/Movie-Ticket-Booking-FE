import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; 
import '../../Index.css';
import Navbar from '../Navbar';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate(); 

  // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/users/register`, form, {
        withCredentials: true,
      });

      localStorage.setItem('userName', form.name); 

      alert('Registered successfully');

      // Navigate based on the role
      if (form.role === 'admin') {
        navigate('/admindashboard'); // Navigate to MovieList if the user is an Admin
      } else if (form.role === 'owner') {
        navigate('/ownerdashboard'); // Navigate to OwnerDashboard if the user is an Owner
      } else if (form.role === 'user') {
        navigate('/userdashboard'); // Navigate to UserDashboard if the user is a regular User
      } else {
        alert('Registration successful, but you do not have access to any dashboards.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="space-y-4 mt-20 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 mb-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
