import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OwnerNavbar from '../OwnerNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddShow = () => {

  // State to hold theater details
  const { theaterId } = useParams(); // Get the theater ID from the URL
  const [theaterDetails, setTheaterDetails] = useState(null);


  // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';




  const [showDetails, setShowDetails] = useState({
    movie: '',
    showtime: new Date(),
    seatsAvailable: 0,
    pricePerSeat: 0,
    image: null,
  });

  

  useEffect(() => {
    const fetchTheaterDetails = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/theaters/get-theaters/${id}`);
            console.log(response.data);
            setShow(response.data);
        } catch (error) {
            console.error('Error fetching show details:', error);
        }
    };
    if (theaterId) {
        fetchTheaterDetails(theaterId); // Pass theaterId here
    }
}, [theaterId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setShowDetails({ ...showDetails, image: files[0] });
    } else {
      setShowDetails({ ...showDetails, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setShowDetails({ ...showDetails, showtime: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('movie', showDetails.movie);
    formData.append('showtime', showDetails.showtime);
    formData.append('seatsAvailable', showDetails.seatsAvailable);
    formData.append('pricePerSeat', showDetails.pricePerSeat);
    
    // Optionally add an image file if one is selected
    if (showDetails.image) {
        formData.append('image', showDetails.image);
    }

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
        },
    };

    try {
        const response = await axios.post(`${apiUrl}/api/shows/addshow`, formData, config);
        alert('Show added successfully');
    } catch (error) {
        alert('Error adding show: ' + (error.response?.data?.message || error.message));
    }
};


  return (
    <div>
      <OwnerNavbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Show</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Movie</label>
            <input
              type="text"
              name="movie"
              value={showDetails.movie}
              onChange={handleChange}
              placeholder="Enter movie name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Show Date & Time</label>
            <DatePicker
              selected={showDetails.showtime}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Seats Available</label>
            <input
              type="number"
              name="seatsAvailable"
              value={showDetails.seatsAvailable}
              onChange={handleChange}
              placeholder="Seats Available"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Per Seat</label>
            <input
              type="number"
              name="pricePerSeat"
              value={showDetails.pricePerSeat}
              onChange={handleChange}
              placeholder="Price Per Seat"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Show
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShow;

