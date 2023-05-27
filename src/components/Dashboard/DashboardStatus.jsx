import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";

export default function DashboardStatus() {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/product/dashboard", {
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
            {!isLoading && (
                <div className="gap-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
                    <BoxWrapper>
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                            <IoBagHandle className="text-2xl text-white" />
                        </div>
                        <div className="pl-4">
                            <span className="text-sm text-gray-500 font-light">Total Sales</span>
                            <div className="flex items-center">
                                <strong className="text-xl text-gray-700 font-semibold">${requestEmployee.totalSum}</strong>
                                <span className="text-sm text-green-500 pl-2"></span>
                            </div>
                        </div>
                    </BoxWrapper>
                    <BoxWrapper>
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                            <IoPieChart className="text-2xl text-white" />
                        </div>
                        <div className="pl-4">
                            <span className="text-sm text-gray-500 font-light">Total Expenses</span>
                            <div className="flex items-center">
                                <strong className="text-xl text-gray-700 font-semibold">${requestEmployee.totalCost}</strong>
                                <span className="text-sm text-green-500 pl-2"></span>
                            </div>
                        </div>
                    </BoxWrapper>
                    <BoxWrapper>
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                            <IoPeople className="text-2xl text-white" />
                        </div>
                        <div className="pl-4">
                            <span className="text-sm text-gray-500 font-light">Total Customers</span>
                            <div className="flex items-center">
                                <strong className="text-xl text-gray-700 font-semibold">{requestEmployee.customers}</strong>
                                <span className="text-sm text-red-500 pl-2"></span>
                            </div>
                        </div>
                    </BoxWrapper>
                    <BoxWrapper>
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                            <IoCart className="text-2xl text-white" />
                        </div>
                        <div className="pl-4">
                            <span className="text-sm text-gray-500 font-light">Total Orders</span>
                            <div className="flex items-center">
                                <strong className="text-xl text-gray-700 font-semibold">{requestEmployee.totalOrders}</strong>
                                <span className="text-sm text-red-500 pl-2"></span>
                            </div>
                        </div>
                    </BoxWrapper>
                </div>
            )}
        </>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-md p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}