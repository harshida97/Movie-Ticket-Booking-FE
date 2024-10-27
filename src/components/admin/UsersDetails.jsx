import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';

const UsersDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/users/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <AdminNavbar/>
            <h1 className='text-red-600 text-center text-2xl mt-5'>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Name: {user.name}, Email: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersDetails;
