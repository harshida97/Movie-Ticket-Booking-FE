import React from 'react';
import { useTheme } from './ThemeContext'; // Adjust path as needed

const ToggleComponent = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-600 text-white p-2 rounded"
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default ToggleComponent;
