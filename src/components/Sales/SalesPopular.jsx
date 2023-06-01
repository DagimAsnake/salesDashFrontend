import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SalesPopular = () => {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/sales/popular", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminAuthCtx.token,
                },
            });
            const data = await response.json();
            console.log(data);
            setRequestEmployee(data.msg);
            setIsLoading(false);
            setFilteredData(data.msg);
        };
        fetchEmployee();
    }, [adminAuthCtx]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const filteredData = requestEmployee.filter((record) =>
            record.productName.toLowerCase().includes(value)
        );
        setFilteredData(filteredData);
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            sorter: (a, b) => a.productName.localeCompare(b.productName),
            sortDirections: ['ascend', 'descend'],
            key: 'productName'
        },
        {
            title: 'Details',
            key: 'details',
            render: (text, record) => (
                <a href={`/product/${record._id}`} className="text-blue-500 hover:underline">
                    details
                </a>
            ),
        },
    ];

    const pagination = {
        showSizeChanger: true,
        defaultPageSize: 6,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        pageSizeOptions: ['6', '12', '24', '48']
    };

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-8 h-8 border-4 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
            <h2 className="text-lg font-medium mb-4 text-gray-800">Popular Demand</h2>
            <div className="w-full overflow-x-auto">
                <Input
                    placeholder="Search by product name..."
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    className="my-4 w-56 bg-gray-100 text-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={pagination}
                    loading={isLoading}
                    className="bg-white"
                    rowClassName="hover:bg-gray-100"
                />
            </div>
        </>
    );
};

export default SalesPopular;