import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import ToggleComponent from './ToggleComponent';


const OwnerNavbar = () => {

    const ownerName = localStorage.getItem('userName');  // Get the name from local storage

    const navigate =useNavigate()

    const handleLogout = () => {
      localStorage.removeItem('token'); // Clear the token
      navigate('/register'); // Redirect to the login page
    };

  


  return (
    <div>
      <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="https://png.pngtree.com/background/20210711/original/pngtree-film-stage-blue-glitter-movie-background-picture-image_1168564.jpg" alt="Logo" className="h-10 w-10" />
          <span className="text-white text-xl ml-2"> Welcome,owner {ownerName}!</span>
        </div>
        
        {/* Links Section */}
        <div className="space-x-6 text-white hover:text-gray-300">
        <Link to="/register">Home</Link>
        <Link to="/theaters">Theaters</Link>
        <Link to="/shows">Shows</Link>
        <Link to="/allbookings">Bookings</Link>
        <Link to="/addtheater">New Theater</Link>
        <button onClick={handleLogout}>Logout</button>
        <ToggleComponent/>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default OwnerNavbar
