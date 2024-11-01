import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL 


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/bookings/getallbookings`); // Adjusted route if needed
        console.log(response.data); // Inspect the structure of the response
        setBookings(response.data);
      } catch (error) {
        alert('Error fetching bookings: ' + error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <OwnerNavbar />
      <h1 className='text-red-600 text-center text-2xl mt-5'>All Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="mb-4 border-b border-gray-200 pb-2">
            <p><strong>User Name:</strong> {booking.user?.name || 'N/A'}</p>
            <p><strong>User Email:</strong> {booking.user?.email || 'N/A'}</p>
            <p><strong>Show Title:</strong> {booking.show?.title || 'N/A'}</p>
            <p><strong>Seats Booked:</strong> {booking.seatsBooked}</p>
            <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
