import React, { useState } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';

const RegisterTheater = () => {
  const [form, setForm] = useState({
    name: '',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/theaters/registertheater', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token for authentication
        }
      });

      // Assuming your API returns the theaterId in the response
      const { theaterId } = response.data; // Adjust this according to your API response structure

      // Store the theaterId in local storage
      localStorage.setItem('theaterId', theaterId); // Store the theater ID

      alert('Theater registered successfully');
      setForm({ name: '', location: '' }); // Reset the form
    } catch (error) {
      alert('Error registering theater: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <OwnerNavbar />

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Register Theater</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Theater Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Theater Name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register Theater
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTheater;
