import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsChart = () => {
    const data = [
        { name: 'January', sales: 65, users: 10 },
        { name: 'February', sales: 59, users: 12 },
        { name: 'March', sales: 80, users: 15 },
        { name: 'April', sales: 81, users: 18 },
        { name: 'May', sales: 56, users: 20 },
        { name: 'June', sales: 55, users: 22 },
        { name: 'July', sales: 40, users: 25 },
    ];


    return (
        <div className="my-8">
            <h2 className="text-lg font-medium mb-4">Sales and User Data</h2>
            <LineChart width={800} height={400} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="users" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default AnalyticsChart;
