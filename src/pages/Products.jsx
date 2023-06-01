import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Input, Select } from "antd";
import AdminAuthContext from "../components/store/Admin-authContext";

const { Search } = Input;
const { Option } = Select;

function Products() {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [productTypes, setProductTypes] = useState([])

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/product/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminAuthCtx.token,
                },
            });
            const data = await response.json();
            console.log(data);
            setRequestEmployee(data.msg);
            setIsLoading(false);
        };
        fetchEmployee();
    }, [adminAuthCtx]);

    useEffect(() => {
        const types = new Set(requestEmployee.map((product) => product.productType));
        setProductTypes(Array.from(types));
    }, [requestEmployee]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilter = (value) => {
        setFilterValue(value);

    };

    const filteredProducts = requestEmployee.filter((product) => {
        if (!filterValue) {
            return true;
        }
        return product.productType === filterValue;
    });

    const searchedProducts = filteredProducts.filter((product) => {
        if (!searchQuery) {
            return true;
        }
        return (
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.productType.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <div className="flex justify-center my-4">
                <Search
                    placeholder="Search products"
                    allowClear
                    enterButton
                    onChange={handleSearch}
                    className="mr-4"
                />
                <Select
                    defaultValue=""
                    style={{ width: 120 }}
                    onChange={handleFilter}
                    className="mr-4"
                >
                    <Option value="">All</Option>
                    {productTypes.map(type => (
                        <Option key={type} value={type}>{type}</Option>
                    ))}
                </Select>
            </div>
            {isLoading && (
                <div className="flex">
                    <div className="m-auto">
                        <div className="inline-flex items-center justify-center">
                            <div className="h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                            <div className="h-8 w-8 ml-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-ping"></div>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {!isLoading && searchedProducts.length <= 0 && (
                    <h3 className="mt-5">There are no Products.</h3>
                )}
                {!isLoading &&
                    searchedProducts.map((product) => {
                        return (
                            <div key={product._id}>
                                <Card className="max-w-xs">
                                    <Link to={`/product/${product._id}`}>
                                        <Card.Meta
                                            title={product.productName}
                                            description={`Type: ${product.productType}`}
                                            className="mb-2"
                                        />
                                    </Link>
                                    <div className="flex justify-between">
                                        <p className="text-lg text-gray-900 font-bold mb-2">
                                            ${product.cost}
                                        </p>
                                        <Link to={`/product/${product._id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Read more ...
                                            </button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Products;