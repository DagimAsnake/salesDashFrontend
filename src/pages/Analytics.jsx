import React from 'react';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import AnalyticsTable from '../components/Analytics/AnalyticsTable';
import RecentProdcut from '../components/Analytics/RecentProduct'
import LocationPieChart from '../components/Analytics/ProductLocation';

const AnalyticsPage = () => {


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className='grid grid-cols-4 gap-10'>
                <div className='col-span-2'>
                    <AnalyticsChart />
                </div>
                <div className='ml-32'>
                    <LocationPieChart />
                </div>
            </div>
            <AnalyticsTable />
            <div className='grid grid-cols-4 gap-5'>
                <div className='col-span-3'>
                    <RecentProdcut />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;