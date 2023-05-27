import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

const ProductDetails = () => {
    const adminAuthCtx = useContext(AdminAuthContext);
    const { proId } = useParams();

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch(`http://localhost:8000/product/detail/${proId}`, {
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
    }, [proId, adminAuthCtx]);

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
            {!isLoading && (
                <div className="container mx-auto px-4">
                    <div className="bg-gray-100 p-4 rounded-md shadow-md max-w-lg mx-auto">
                        <h2 className="text-lg font-medium mb-2">{requestEmployee.productName}</h2>
                        <div className="flex flex-wrap mb-2">
                            <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                <span className="mr-4">
                                    <strong>Type:</strong> {requestEmployee.productType}
                                </span>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <span>
                                    <strong>Cost:</strong> {requestEmployee.cost}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                <span className="mr-4">
                                    <strong>Sold:</strong> {requestEmployee.sold ? 'Yes' : "No"}
                                </span>
                            </div>
                            <div className={`${requestEmployee.soldBy
                                ? "w-full sm:w-1/2"
                                : "hidden"
                                }`}>
                                <span>
                                    <strong>Sold By:</strong> {requestEmployee.soldBy}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div className={`${requestEmployee.price
                                ? "w-full sm:w-1/2 mb-2 sm:mb-0"
                                : "hidden"
                                }`} >
                                <span className="mr-4">
                                    <strong>Price:</strong> {requestEmployee.price}
                                </span>
                            </div>
                            <div className={`${requestEmployee.location
                                ? "w-full sm:w-1/2"
                                : "hidden"
                                }`}  >
                                <span>
                                    <strong>Location:</strong> {requestEmployee.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;