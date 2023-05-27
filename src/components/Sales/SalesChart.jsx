
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const SalesChart = ({ data }) => {
//     return (
//         <div className="p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Sales Chart</h2>
//             <BarChart
//                 width={600}
//                 height={300}
//                 data={data}
//                 margin={{
//                     top: 5, right: 30, left: 20, bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="sales" fill="#8884d8" />
//             </BarChart>
//         </div>
//     );
// };

// export default SalesChart;

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
        <div className="my-8">
            <h2 className="text-lg font-medium mb-4">Sales Chart</h2>
            <LineChart width={800} height={400} data={data}>
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