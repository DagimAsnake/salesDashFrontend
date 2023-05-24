import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate()

    const { userId, token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState("")

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const loginRequest = async () => {
                const response = await fetch(`http://localhost:8000/auth/passwordreset/${userId}/${token}`, {
                    method: "POST",
                    body: JSON.stringify({
                        password: password,
                        confirm_Password: confirmPassword
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.log("something is wrong");
                    console.log(response)
                }

                const data = await response.json();
                console.log(data);

                setErrMsg(data.msg)

                if (data.msg === "Password Changed Successfully") {
                    navigate("/login");
                }

            };

            loginRequest();
        } else {
            setErrors(validationErrors);
        }
    };

    const validate = () => {
        const errors = {};
        if (!confirmPassword) {
            errors.confirmPassword = "Password is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="sm:w-1/3">
                <form onSubmit={handleSubmit} className="bg-white p-12 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-8">Change Password</h2>
                    <div className="mb-8">
                        <label htmlFor="password" className="block font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className={`w-full p-3 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-8">
                        <label htmlFor="confirmPassword" className="block font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className={`w-full p-3 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <p className="text-red-500 text-lg">{errMsg}</p>
                    <div className="flex flex-col mb-8">
                        <button className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;