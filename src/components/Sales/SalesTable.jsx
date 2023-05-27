// // SalesTable.js
// import React from 'react';

// const SalesTable = ({ data }) => {
//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Sales Table</h2>
//       <table className="min-w-full table-auto">
//         <thead className="justify-between">
//           <tr className="bg-gray-800">
//             <th className="px-2 py-2 text-gray-200">Name</th>
//             <th className="px-2 py-2 text-gray-200">Sales</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'} text-center`}>
//               <td className="px-2 py-2">{row.name}</td>
//               <td className="px-2 py-2">{row.sales}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesTable;


import React, { useState } from 'react';

const SalesTable = () => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedFilter, setSelectedFilter] = useState('');

  const salesData = [
    { name: 'Product A', sales: 1000, date: '2022-05-01' },
    { name: 'Product B', sales: 500, date: '2022-05-01' },
    { name: 'Product C', sales: 750, date: '2022-05-01' },
    { name: 'Product A', sales: 800, date: '2022-05-02' },
    { name: 'Product B', sales: 550, date: '2022-05-02' },
    { name: 'Product C', sales: 900, date: '2022-05-02' },
    { name: 'Product A', sales: 1200, date: '2022-05-03' },
    { name: 'Product B', sales: 650, date: '2022-05-03' },
    { name: 'Product C', sales: 800, date: '2022-05-03' },
  ];

  const handleSort = (field) => {
    if (sortDirection === 'asc') {
      salesData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      setSortDirection('desc');
    } else {
      salesData.sort((a, b) => (a[field] < b[field] ? 1 : -1));
      setSortDirection('asc');
    }
  };

  const handleFilter = (value) => {
    setSelectedFilter(value);
  };

  const filteredData = selectedFilter
    ? salesData.filter((data) => data.name === selectedFilter)
    : salesData;

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Sales Data</h2>
        <div className="flex items-center">
          <label htmlFor="filter" className="mr-2">
            Filter by product:
          </label>
          <select
            id="filter"
            className="border rounded-sm px-2 py-1"
            value={selectedFilter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
            <option value="Product C">Product C</option>
          </select>
        </div>
      </div>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th
              className="border py-2 px-4 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Product Name
              {sortDirection === 'asc' ? (
                <svg
                  className="inline-block h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="inline-block h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </th>
            <th
              className="border py-2 px-4 cursor-pointer"
              onClick={() => handleSort('sales')}
            >
              Sales
              {sortDirection === 'asc' ? (
                <svg
                  className="inline-blockh-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="inline-block h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </th>
            <th className="border py-2 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td className="border py-2 px-4">{data.name}</td>
              <td className="border py-2 px-4">{data.sales}</td>
              <td className="border py-2 px-4">{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;