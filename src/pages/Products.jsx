import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

function Products() {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            {isLoading && <div className="flex">
                <div className="m-auto">
                    <div className="inline-flex items-center justify-center">
                        <div className="h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        <div className="h-8 w-8 ml-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>}
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {!isLoading && requestEmployee.length <= 0 && (
                    <h3 className="mt-5">There are no Products.</h3>)}
                {!isLoading && requestEmployee.map((emp) => {
                    return (
                        <div key={emp._id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs">
                            <div className="px-4 py-2">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{emp.productName}</h2>
                                <p className="text-sm text-gray-600 mb-2">Type: {emp.productType} </p>
                                <p className="text-lg text-gray-900 font-bold mb-2">${emp.cost}</p>
                                <Link to={`/product/${emp._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Read more ...
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Products;