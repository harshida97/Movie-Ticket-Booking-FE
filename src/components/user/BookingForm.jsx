import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../UserNavbar';

const BookingForm = () => {
    const { showId } = useParams(); // Get the show ID from the URL
    const [show, setShow] = useState(null);
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');

     // Centralize API URL using environment variable or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';



    useEffect(() => {
        const fetchShowDetails = async (id) => {
            try {
                const response = await axios.get(`${apiUrl}/api/shows/shows/${id}`);
                console.log(response.data);
                setShow(response.data);
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };
        if (showId) {
            fetchShowDetails(showId); // Pass showId here
        }
    }, [showId]);

    const handleBooking = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(
                `${apiUrl}/api/bookings/createbooking`,
                { show: showId, seatsBooked: seats },
                config
            );

            // Calculate total amount
            const totalAmount = seats * show.pricePerSeat;

            // Show success alert with the total amount
            alert(`Booking successful! Total amount: $${totalAmount}`);

            setMessage(response.data.message);
        } catch (error) {
            console.error('Booking failed:', error);
            setMessage('Booking failed, please try again.');
        }
    };

    if (!show) return <p>Loading show details...</p>;

    return (

        <div>
            <UserNavbar/>


        <div className="p-8">
            <h1 className="text-4xl text-center text-blue-950 font-bold mb-6">Book Here</h1>
            <form onSubmit={handleBooking}>
                <div className="mb-4 ">
                    <p>Movie: <span className='font-bold text-blue-400 text-2xl'> {show.movie?.title} </span></p>
                    <p>Theater:<span className='font-bold text-blue-400 text-2xl'> {show.theater?.name}</span></p>
                    <p>Showtime:<span className='font-bold text-blue-400 text-2xl'>{new Date(show.showtime).toLocaleString()}</span></p>
                    <p>Price per Seat:<span className='font-bold text-blue-400 text-2xl'> ${show.pricePerSeat}</span></p>
                </div>

                <div className="mb-4">
                    <label htmlFor="seats" className="block text-gray-700 font-bold mb-2">
                        Seats to Book:
                    </label>
                    <input
                        type="number"
                        id="seats"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        min="1"
                        max={show.seatsAvailable}
                        className="border rounded-lg p-2 w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Book Now
                </button>
            </form>

            {message && <p className="mt-4 text-center text-3xl text-green-500">{message}</p>}
        </div>
        </div>
    );
};

export default BookingForm;
