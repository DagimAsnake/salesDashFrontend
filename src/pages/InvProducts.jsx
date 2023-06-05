import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../components/store/Admin-authContext";
import { Table, Input, Space, Select, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function InvProducts() {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchColumn, setSearchColumn] = useState('productName');
    const [sortColumn, setSortColumn] = useState('productName');
    const [sortOrder, setSortOrder] = useState('ascend');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState('3');

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/product/invproduct", {
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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleSort = (column) => {
        if (sortColumn === column && sortOrder === 'ascend') {
            setSortOrder('descend');
        } else {
            setSortOrder('ascend');
        }
        setSortColumn(column);
    };

    const getColumnSearchProps = (dataIndex, displayName) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${displayName}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>Search</button>
                    <button onClick={() => handleReset(clearFilters)}>Reset</button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            const searchValue = value.toLowerCase();
            return record[dataIndex].toString().toLowerCase().includes(searchValue);
        },
    });

    const handleFilter = (value, record) => {
        setFilteredData(requestEmployee.filter(product => product.productType === value));
    };

    const { Option } = Select;

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            ...getColumnSearchProps('productName', 'Product Name'),
            sorter: (a, b) => a.productName.localeCompare(b.productName),
        },
        {
            title: 'Product Specification',
            dataIndex: 'productSpecification',
            key: 'productSpecification',
            ...getColumnSearchProps('productSpecification', 'Product Specification'),
            sorter: (a, b) => a.productSpecification.localeCompare(b.productSpecification),
        },
        {
            title: 'Product Quantity',
            dataIndex: 'productQuantity',
            key: 'productQuantity',
            sorter: (a, b) => a.productQuantity - b.productQuantity,
        },
        {
            title: 'Shelf Number',
            dataIndex: 'shelfNumber',
            key: 'shelfNumber',
            ...getColumnSearchProps('shelfNumber', 'Shelf Number'),
        },
        {
            title: 'Warehouse Number',
            dataIndex: 'warehouseNumber',
            key: 'warehouseNumber',
            ...getColumnSearchProps('warehouseNumber', 'Warehouse Number'),
        },
        {
            title: 'Product Type',
            dataIndex: 'productType',
            key: 'productType',
            filters: [
                { text: 'Type A', value: 'Type A' },
                { text: 'Type B', value: 'Type B' },
                { text: 'Type C', value: 'Type C' },
            ],
            onFilter: handleFilter,
        },
        {
            title: 'Safety Type',
            dataIndex: 'safetyType',
            key: 'safetyType',
            ...getColumnSearchProps('safetyType', 'Safety Type'),
        },
        {
            title: 'Measuring Input',
            dataIndex: 'measuringInput',
            key: 'measuringInput',
            ...getColumnSearchProps('measuringInput', 'Measuring Input'),
        },
        {
            title: 'Expire Date',
            dataIndex: 'expireDate',
            key: 'expireDate',
            ...getColumnSearchProps('expireDate', 'Expire Date'),
            sorter: (a, b) => new Date(a.expireDate) - new Date(b.expireDate),
        },
        {
            title: 'Product Usability',
            dataIndex: 'productUsability',
            key: 'productUsability',
            ...getColumnSearchProps('productUsability', 'Product Usability'),
        },
    ];

    const sortedData = [...filteredData].sort((a, b) => {
        const sortValue = sortOrder === 'ascend' ? 1 : -1;
        if (a[sortColumn] < b[sortColumn]) {
            return -1 * sortValue;
        }
        if (a[sortColumn] > b[sortColumn]) {
            return 1 * sortValue;
        }
        return 0;
    });

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <Table
                dataSource={paginatedData}
                columns={columns}
                loading={isLoading}
                onChange={(pagination, filters, sorter) => {
                    setSearchText('');
                    setFilteredData(requestEmployee);
                    setSortColumn(sorter.columnKey);
                    setSortOrder(sorter.order);
                }}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={sortedData.length}
                onChange={handlePageChange}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </>
    );
}

export default InvProducts;