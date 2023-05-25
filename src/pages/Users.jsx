import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import AdminAuthContext from "../components/store/Admin-authContext";
import classNames from 'classnames'

function Users() {
    const adminAuthCtx = useContext(AdminAuthContext)

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/user/", {
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
            <div className="bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-3xl">
                    {isLoading && <h3>Loading......</h3>}
                    {!isLoading && requestEmployee.length <= 0 && (
                        <h3 className="mt-5">There are no employees.</h3>
                    )}

                    {!isLoading && requestEmployee.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-20">
                            <h6 className="text-white bg-blue-500 rounded-t-lg px-4 py-2">Employee Lists</h6>
                            <div className="px-4 py-2">
                                {!isLoading &&
                                    requestEmployee.map((emp) => {
                                        return (
                                            <div className={classNames("grid grid-cols-3 p-3 border-b-2 items-center", emp.role === "Admin" ? "hidden" : "")}>
                                                <p className="text-gray-800 font-semibold" key={emp._id}>
                                                    {emp.firstname} {emp.lastname}
                                                </p>

                                                <p className="flex justify-end">
                                                    <Link
                                                        to={`/`}
                                                        className="bg-blue-500 text-white rounded-lg hover:bg-blue-400 px-3 py-2 text-xl font-semibold cursor-pointer tracking-wider"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Users;
