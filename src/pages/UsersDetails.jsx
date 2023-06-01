import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

function EmpListDetails() {
  const adminAuthCtx = useContext(AdminAuthContext);
  const { userId } = useParams();
  const navigate = useNavigate()

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

  const handleActivate = async () => {
    const updatedActive = !requestEmployee.isactive;
    const response = await fetch(
      `http://localhost:8000/user/${userId}/deactivate`,
      {
        method: "post",
        body: JSON.stringify({
          isactive: updatedActive,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminAuthCtx.token,
        },
      }
    );
    if (!response.ok) {
      console.log("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    if (data.msg === "Activation works correctly") {
      navigate(`/users`);
    }
  };


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
            <p>
              <Link
                to={``}
                className={`${requestEmployee.isactive ? "bg-red-500  hover:bg-red-400" : "bg-green-500  hover:bg-green-400"} text-white rounded-lg px-3 py-2 text-xl font-semibold cursor-pointer tracking-wider transition duration-300 ease-in-out`}
              >
                <button onClick={handleActivate}>{requestEmployee.isactive ? "Deactivate" : "Activate"}</button>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default EmpListDetails;