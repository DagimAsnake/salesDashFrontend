import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesTable = () => {
  const adminAuthCtx = useContext(AdminAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8000/sales/salesSearch?search=${search}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminAuthCtx.token,
          },
        });
        const data = await response.json();
        console.log(data);
        setRequestEmployee(data.msg);
        console.log(data.msg)
        setIsLoading(false);
        setFilteredData(data.msg.filter(record => record.totalAddedCost !== 0));
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchEmployee();
  }, [adminAuthCtx, search]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = requestEmployee.filter((record) =>
      record.productName.toLowerCase().includes(value)
    );
    setFilteredData(filteredData.filter(record => record.totalAddedCost !== 0));
    setSearch(value);
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
      title: 'Sales',
      dataIndex: 'totalAddedCost',
      sorter: (a, b) => a.totalAddedCost - b.totalAddedCost,
      sortDirections: ['ascend', 'descend'],
      key: 'sales'
    }
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
        <div className="flex justify-center items-center h-screen">
          <div className="h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <div className="h-8 w-8 ml-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-ping"></div>
        </div>
      )}
      <div className="my-8 overflow-x-auto">
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

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none my-5"
          onClick={() => {
            const doc = new jsPDF()

            const date = new Date();
            const timeStamp = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}_${date.getMinutes()}`

            doc.autoTable({
              head: [
                ["Product Name", "Sales"],

              ],
              body: filteredData.map(row => [
                row.productName,
                row.totalAddedCost
              ])
            })

            doc.save(`sales_report_${timeStamp}.pdf`)
          }}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default SalesTable;