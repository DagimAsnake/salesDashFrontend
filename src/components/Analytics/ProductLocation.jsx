import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'


const RADIAN = Math.PI / 180
const COLORS = ['#00C49F', '#FFBB28', '#FF8042', "#55CA54", "#F54642", "#652042", "#FF8541"]

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export default function LocationPieChart() {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/analytics/location", {
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

    const data = requestEmployee.map((item) => (
        item._id ? { name: item._id, value: item.count } : null
    )).filter((item) => item !== null);

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
                <div className="w-[25rem] h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
                    <strong className="text-gray-700 font-medium">Sold Product Location Status</strong>
                    <div className="mt-3 w-full flex-1 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="45%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}