
import React from 'react';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
    const handleRegionChange = (event) => {
        onRegionChange(event.target.value);
    };

    return (
        <div className="flex items-center mb-4">
            <label htmlFor="regionFilter" className="mr-4 font-medium">
                Region:
            </label>
            <select
                id="regionFilter"
                value={selectedRegion}
                onChange={handleRegionChange}
                className="px-4 py-2 border rounded-md"
            >
                <option value="">All Regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
            </select>
        </div>
    );
};

export default RegionFilter;