import React from 'react';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import AnalyticsTable from '../components/Analytics/AnalyticsTable';

const AnalyticsPage = () => {


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <AnalyticsChart />
            <AnalyticsTable />
        </div>
    );
};

export default AnalyticsPage;