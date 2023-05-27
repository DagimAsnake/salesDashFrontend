import React from 'react';

const AnalyticsTable = ({ dateRange, selectedRegion, selectedCategory }) => {
    const data = [
        { name: 'Product A', sales: 1000, users: 150, region: 'North', category: 'Category 1' },
        { name: 'Product B', sales: 500, users: 75, region: 'South', category: 'Category 2' },
        { name: 'Product C', sales: 750, users: 100, region: 'East', category: 'Category 1' },
        { name: 'Product A', sales: 800, users: 120, region: 'West', category: 'Category 3' },
        { name: 'Product B', sales: 550, users: 80, region: 'North', category: 'Category2' },
        { name: 'Product C', sales: 900, users: 130, region: 'South', category: 'Category 1' },
    ];

    const filteredData = data.filter((item) => {
        let isInDateRange = true;
        if (dateRange.startDate && dateRange.endDate) {
            const itemDate = new Date(`${item.name} 1, 2022`);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);
            isInDateRange = itemDate >= startDate && itemDate <= endDate;
        }
        let isInRegion = true;
        if (selectedRegion) {
            isInRegion = item.region === selectedRegion;
        }
        let isInCategory = true;
        if (selectedCategory) {
            isInCategory = item.category === selectedCategory;
        }
        return isInDateRange && isInRegion && isInCategory;
    });

    return (
        <div className="my-8">
            <h2 className="text-lg font-medium mb-4">Sales and User Data Table</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left">Product Name</th>
                        <th className="py-2 px-4 text-left">Sales</th>
                        <th className="py-2 px-4 text-left">Users</th>
                        <th className="py-2 px-4 text-left">Region</th>
                        <th className="py-2 px-4 text-left">Product Category</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.name}>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.sales}</td>
                            <td className="py-2 px-4">{item.users}</td>
                            <td className="py-2 px-4">{item.region}</td>
                            <td className="py-2 px-4">{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticsTable;