import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-700 mt-4">The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4">Go back to the homepage</Link>
        </div>
    );
};

export default NotFound404;