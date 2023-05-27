// SalesPage.js
import React from 'react';
import SalesChart from '../components/Sales/SalesChart';
import SalesTable from '../components/Sales/SalesTable';

// const SalesPage = () => {
//     const data = [
//         { name: 'Product A', sales: 4000 },
//         { name: 'Product B', sales: 3000 },
//         { name: 'Product C', sales: 2000 },
//         { name: 'Product D', sales: 2780 },
//         { name: 'Product E', sales: 1890 },
//     ];

//     return (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
//             <SalesChart data={data} />
//             <SalesTable data={data} />
//         </div>
//     );
// };

// export default SalesPage;

const SalesPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sales Information</h1>
            <SalesChart />
            <SalesTable />
        </div>
    );
};

export default SalesPage;