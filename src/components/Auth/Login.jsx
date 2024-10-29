import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await axios.post(`${apiUrl}/api/users/login`, form, {
            withCredentials: true,
        });

        // Log the response to check if user data is being returned correctly
        console.log('Login response:', response.data);

        // Store the token and role in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);

        // Redirect based on role
        if (response.data.user.role === 'admin') {
            navigate('/admin-dashboard');
        } else if (response.data.user.role === 'owner') {
            navigate('/owner-dashboard');
        } else if (response.data.user.role === 'user') {
            navigate('/user-dashboard');
        } else {
            alert('Access denied. Invalid role.');
        }
    } catch (error) {
        setError('Invalid credentials');
        console.error('Login error:', error.response ? error.response.data : error.message);
    } finally {
        setLoading(false);
    }
};


  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (

    <div>
      <Navbar/>


    <div className="space-y-4 mt-20 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />
        {error && <div className="text-red-500">{error}</div>} {/* Error message display */}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Link to the register page */}
      <div className="text-center mt-4">
        <p>
          Don't have an account?{' '}
          <span 
            onClick={handleRegisterRedirect} 
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Click here
          </span> 
          to register.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
