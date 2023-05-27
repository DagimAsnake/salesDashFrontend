import React, { useState } from 'react';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import AnalyticsTable from '../components/Analytics/AnalyticsTable';
import DateRangePicker from '../components/Analytics/DateRangePicker';
import RegionFilter from '../components/Analytics/RegionFilter';
import ProductCategoryFilter from '../components/Analytics/ProductCategoryFilter';

const AnalyticsPage = () => {
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleDateRangeChange = (selectedRange) => {
        setDateRange(selectedRange);
    };

    const handleRegionChange = (selectedRegion) => {
        setSelectedRegion(selectedRegion);
    };

    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className="flex flex-wrap justify-between items-center mb-4">
                <DateRangePicker dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
                <RegionFilter selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
                <ProductCategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <AnalyticsChart dateRange={dateRange} selectedRegion={selectedRegion} selectedCategory={selectedCategory} />
            <AnalyticsTable dateRange={dateRange} selectedRegion={selectedRegion} selectedCategory={selectedCategory} />
        </div>
    );
};

export default AnalyticsPage;