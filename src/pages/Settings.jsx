import React from "react";
import { Link } from "react-router-dom";

function Settings() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>
                <div className="flex flex-col space-y-4">
                    <Link
                        to="/updatepassword"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-lg font-medium"
                    >
                        Change Password
                    </Link>
                    <Link
                        to="/profile"
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md text-lg font-medium"
                    >
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Settings;