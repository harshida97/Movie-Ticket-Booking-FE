// TheaterList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from '../OwnerNavbar';

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   // Centralize API URL using environment variable or fallback to localhost
   const apiUrl = import.meta.env.VITE_API_URL;



  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/theaters/list-theaters`);
        setTheaters(response.data);
      } catch (error) {
        setError('Error fetching theaters: ' + error.message);
      }
    };

    fetchTheaters();
  }, []);

  const handleAddShow = (theaterId) => {
    navigate('/addshows'); // Navigate to Add Show page with 
  };

  return (
    <div>
      <OwnerNavbar />
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Theater List</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="theater-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {theaters.length === 0 ? (
            <p>No theaters available.</p>
          ) : (
            theaters.map((theater) => (
              <div key={theater._id} className="theater-card p-4 border rounded shadow-md bg-white">
                <h2 className="text-xl font-semibold">{theater.name}</h2>
                <p className="text-gray-700">Location: {theater.location}</p>
                <p className="text-gray-700">Owner: {theater.owner ? theater.owner.name : 'Unknown'}</p>
                <p className="text-green-700 font-semibold">
                  Status: {theater.isApproved ? 'Approved' : 'Pending Approval'}
                </p>
                {theater.isApproved && (
                  <button
                    onClick={() => handleAddShow()}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Show
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TheaterList;
