import React, { useEffect, useState, useContext } from "react";
import { Table, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AdminAuthContext from "../store/Admin-authContext";

const RecentProduct = () => {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/analytics/recent", {
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
        setSearchText(value);
        const filteredData = requestEmployee.filter((record) =>
            record.productName.toLowerCase().includes(value) &&
            (!dateRange.length ||
                (new Date(record.createdAt) >= dateRange[0] && new Date(record.createdAt) <= dateRange[1]))
        );
        setFilteredData(filteredData);
    };

    const handleDateChange = (value) => {
        setDateRange(value);
        const filteredData = requestEmployee.filter((record) =>
            record.productName.toLowerCase().includes(searchText) &&
            (!value || (value && value.length && new Date(record.createdAt) >= value[0] && new Date(record.createdAt) <= value[1]))
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
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['ascend', 'descend'],
            key: 'price'
        },
        {
            title: 'Sold Date',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            sortDirections: ['ascend', 'descend'],
            key: 'createdAt',
            render: (text, record) => {
                return new Date(record.createdAt).toLocaleDateString();
            }
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
            <h2 className="text-lg font-medium mb-4 text-gray-800">Recent Sold Product Table</h2>
            <div className="my-8">
                <Input
                    placeholder="Search by product name..."
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    className="my-4 w-56 bg-gray-100 text-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <DatePicker.RangePicker
                    onChange={handleDateChange}
                    className="my-4 ml-4"
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

export default RecentProduct;