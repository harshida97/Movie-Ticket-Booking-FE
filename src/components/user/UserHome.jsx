import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from "../UserNavbar";

const UserHome = () => {
    const [shows, setShows] = useState([]);
    const navigate = useNavigate();

     // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL;



    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/shows/showlist`);
                setShows(response.data);
            } catch (error) {
                alert('Error fetching shows: ' + error.message);
            }
        };
        fetchShows();
    }, []);

    // Function to handle the button click
    const handleBookShow = (showId) => {
        navigate(`/bookings/${showId}`); // Navigate to booking form with showId
    };

    return (
        <div>
            <UserNavbar/>


            <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">SELECT YOUR CHOICE</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.map((show) => (
                    <div 
                        key={show._id} 
                        className="bg-white shadow-md text-center rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Directly access show properties */}
                        <img 
                            src={`${apiUrl}/${show.image}`} 
                            alt={show.movie} // Using movie title as alt text
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <h2 className="text-xl font-semibold mb-2">Movie: {show.movie}</h2>
                        <p className="text-gray-700 mb-1">Showtime: {new Date(show.showtime).toLocaleString()}</p>
                        <p className="text-gray-700 mb-1">Seats Available: {show.seatsAvailable}</p>
                        <p className="text-gray-700 mb-1">Price per Seat: ${show.pricePerSeat}</p>
                        <button 
                            className="bg-orange-400 rounded-xl w-full h-[60px] text-white"
                            onClick={() => handleBookShow(show._id)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default UserHome;
