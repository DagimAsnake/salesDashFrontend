import React from 'react';
import SalesChart from '../components/Sales/SalesChart';
import SalesTable from '../components/Sales/SalesTable';
import SalesPopular from '../components/Sales/SalesPopular';

const SalesPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sales Information</h1>
            <div className='grid grid-cols-4'>
                <div className='col-span-2 bg-white'>
                    <SalesChart />
                </div>
                <div className='ml-5 col-span-2'>
                    <SalesPopular />
                </div>
            </div>
            <SalesTable />
        </div>
    );
};

export default SalesPage;