import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

function EmpListDetails() {
  const adminAuthCtx = useContext(AdminAuthContext);
  const { userId } = useParams();

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`http://localhost:8000/user/detail/${userId}`, {
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
  }, [userId, adminAuthCtx]);

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
        <div className="grid grid-cols-2 m-20">
          <div className="">
            <div className="flex justify-start p-5 border-b-2">
              <h4 className="text-blue-500 text-2xl mr-4 font-semibold">Full Name:</h4>{" "}
              <div className="pt-2 font-medium">
                {" "}
                {requestEmployee.firstname} {requestEmployee.lastname}{" "}
              </div>
            </div>
            <div className="flex justify-start p-5 border-b-2">
              <h4 className="text-blue-500 text-2xl mr-4 font-semibold">Username:</h4>{" "}
              <div className="pt-2 font-medium">{requestEmployee.username} </div>
            </div>
            <div className="flex justify-start p-5">
              <h4 className="text-blue-500 text-2xl mr-4 font-semibold">Email:</h4>
              <div className="pt-2 font-medium">{requestEmployee.email}</div>
            </div>
            <div className="flex justify-start p-5">
              <h4 className="text-blue-500 text-2xl mr-4 font-semibold">Role:</h4>
              <div className="pt-2 font-medium">{requestEmployee.role}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmpListDetails;