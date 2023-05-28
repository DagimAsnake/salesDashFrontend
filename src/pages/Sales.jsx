import React from 'react';
import SalesChart from '../components/Sales/SalesChart';
import SalesTable from '../components/Sales/SalesTable';

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