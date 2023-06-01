import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesChart = () => {
    const data = [
        { name: 'January', sales: 65 },
        { name: 'February', sales: 59 },
        { name: 'March', sales: 80 },
        { name: 'April', sales: 81 },
        { name: 'May', sales: 56 },
        { name: 'June', sales: 55 },
        { name: 'July', sales: 40 },
    ];

    return (
        <div className="my-8 bg-white">
            <h2 className="text-lg font-medium mb-4">Sales Chart</h2>
            <LineChart width={700} height={400} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default SalesChart;