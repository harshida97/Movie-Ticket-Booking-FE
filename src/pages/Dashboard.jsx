import jwt_decode from 'jwt-decode'; // Correct default import
import AdminDashboard from './AdminDashboard';
import OwnerDashboard from './OwnerDashboard';
import UserDashboard from './UserDashboard';
import Register from '../components/Auth/Register';


const Dashboard = () => {
  const token = localStorage.getItem('token');

  // If no token is found, show the registration form
  if (!token) {
    return (
      <div>
        <Register /> {/* Show the registration form when the user is not authenticated */}
      </div>
    );
  }

  let decoded;
  try {
    decoded = jwt_decode(token);  // Use the decoded token
  } catch (error) {
    console.error('Error decoding token:', error);
    return <div>Error decoding token</div>;
  }

  // Conditional rendering based on the user's role
  if (decoded.role === 'admin') {
    return <AdminDashboard />;
  } else if (decoded.role === 'owner') {
    return <OwnerDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;
