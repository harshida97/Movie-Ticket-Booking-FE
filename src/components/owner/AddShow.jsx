import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import OwnerNavbar from '../OwnerNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theaterId, theaterName } = location.state || {};

  // Centralize API URL
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showDetails, setShowDetails] = useState({
    movie: '',
    description: '',
    releaseDate: new Date(),
    duration: '',
    showtime: new Date(),
    seatsAvailable: 0,
    pricePerSeat: 0,
    image: null,
    theaterId: theaterId || '',
  });

  useEffect(() => {
    if (theaterId) {
      setShowDetails(prev => ({ ...prev, theaterId }));
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

  const handleDateChange = (field, date) => {
    setShowDetails({ ...showDetails, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('movie', showDetails.movie);
    formData.append('description', showDetails.description);
    formData.append('releaseDate', showDetails.releaseDate);
    formData.append('duration', showDetails.duration);
    formData.append('showtime', showDetails.showtime);
    formData.append('seatsAvailable', showDetails.seatsAvailable);
    formData.append('pricePerSeat', showDetails.pricePerSeat);
    formData.append('theaterId', showDetails.theaterId);

    if (showDetails.image) {
      formData.append('image', showDetails.image);
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${apiUrl}/api/shows/addshow`, formData, config);
      alert('Show added successfully');
      navigate('/theaterlist'); // Redirect after successful add
    } catch (error) {
      alert('Error adding show: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!theaterId) {
    return (
      <div>
        <OwnerNavbar />
        <div className="text-center mt-8 text-red-600 font-semibold">
          No theater selected. Please go back and select a theater.
        </div>
      </div>
    );
  }

  return (
    <div>
      <OwnerNavbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Show</h1>

        <div className="mb-4 text-gray-800 font-medium">
          🎭 Selected Theater: <strong>{theaterName}</strong>
        </div>

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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={showDetails.description}
              onChange={handleChange}
              placeholder="About movie"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Release Date</label>
            <DatePicker
              selected={showDetails.releaseDate}
              onChange={(date) => handleDateChange('releaseDate', date)}
              dateFormat="MMMM d, yyyy"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={showDetails.duration}
              onChange={handleChange}
              placeholder="Enter duration"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Show Date & Time</label>
            <DatePicker
              selected={showDetails.showtime}
              onChange={(date) => handleDateChange('showtime', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
