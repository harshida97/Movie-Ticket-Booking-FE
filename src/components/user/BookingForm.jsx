import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../UserNavbar';

const BookingForm = () => {
    const { showId } = useParams(); // Get the show ID from the URL
    const [show, setShow] = useState(null);
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    // Centralize API URL using environment variable or fallback to localhost
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchShowDetails = async (id) => {
            try {
                const response = await axios.get(`${apiUrl}/api/shows/shows/${id}`);
                setShow(response.data);
                setTotalAmount(response.data.pricePerSeat); // Initial amount calculation
            } catch (error) {
                console.error('Error fetching show details:', error);
                setErrorMessage('Failed to load show details. Please try again later.');
            }
        };
        if (showId) {
            fetchShowDetails(showId); // Pass showId here
        }
    }, [showId]);

    const handleBooking = async (e) => {
        e.preventDefault();

        // Prevent booking more seats than available
        if (seats > show.seatsAvailable) {
            setErrorMessage(`Only ${show.seatsAvailable} seats are available.`);
            return;
        }

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

            // Show success alert with the total amount
            alert(`Booking successful! Total amount: $${seats * show.pricePerSeat}`);

            setMessage(response.data.message);
            setErrorMessage(''); // Reset error message if booking is successful
        } catch (error) {
            console.error('Booking failed:', error);
            setMessage('');
            setErrorMessage('Booking failed, please try again.');
        }
    };

    if (!show) return <p>Loading show details...</p>;

    return (
        <div>
            <UserNavbar />
            <div className="p-8">
                <h1 className="text-4xl text-center text-blue-950 font-bold mb-6">Book Here</h1>
                <form onSubmit={handleBooking}>
                    <div className="mb-4 ">
                        <h2 className="text-xl font-semibold text-center mb-2"> {show.movie}</h2>
                        {/* Check for the theater data */}
                        
                        <p>
                            Showtime:
                            <span className="font-bold text-blue-400 text-2xl">
                                {new Date(show.showtime).toLocaleString()}
                            </span>
                        </p>
                        <p>
                            Price per Seat:
                            <span className="font-bold text-blue-400 text-2xl"> ${show.pricePerSeat}</span>
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="seats" className="block text-gray-700 font-bold mb-2">
                            Seats to Book:
                        </label>
                        <input
                            type="number"
                            id="seats"
                            value={seats}
                            onChange={(e) => {
                                const newSeats = Math.min(e.target.value, show.seatsAvailable);
                                setSeats(newSeats);
                                setTotalAmount(newSeats * show.pricePerSeat); // Update total amount dynamically
                            }}
                            min="1"
                            max={show.seatsAvailable}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Total Amount:</label>
                        <p className="text-blue-500 text-xl">${totalAmount}</p>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Book Now
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-3xl text-green-500">{message}</p>}
                {errorMessage && <p className="mt-4 text-center text-3xl text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default BookingForm;
