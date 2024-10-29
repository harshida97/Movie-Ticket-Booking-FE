import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';


 

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/shows/showlist`); // Ensure this is the correct endpoint
                setShows(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShows();
    }, []);
    if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

    

  
  


  return (
    <div>
        <AdminNavbar />
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Show List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.map((show) => (
                    <div 
                        key={show._id} 
                        className="bg-white shadow-md text-center rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Directly access show properties */}
                        <img 
                            src={`http://localhost:3000/${show.image}`} 
                            alt={show.movie} // Using movie title as alt text
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <h2 className="text-xl font-semibold mb-2">Movie: {show.movie}</h2>
                        <p className="text-gray-700 mb-1">Showtime: {new Date(show.showtime).toLocaleString()}</p>
                        <p className="text-gray-700 mb-1">Seats Available: {show.seatsAvailable}</p>
                        <p className="text-gray-700 mb-1">Price per Seat: ${show.pricePerSeat}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};


export default ShowList;
