import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";

const RecentProduct = () => {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        };
        fetchEmployee();
    }, [adminAuthCtx]);

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-8 h-8 border-4 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
            <h2 className="text-lg font-medium mb-4 text-gray-800">Recent Sold Product Table</h2>
            <div className="w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Sold Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {!isLoading &&
                            requestEmployee.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-b border-gray-200 hover:bg-gray-100 bg-white"
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {product.productName}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RecentProduct;