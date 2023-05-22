import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminAuthContext from "../store/Admin-authContext";

const Login = () => {
    const adminAuthCtx = useContext(AdminAuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState("")

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const loginRequest = async () => {
                const response = await fetch("http://localhost:8000/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password,
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

                setErrMsg(data.msg);

                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

                adminAuthCtx.login(data.token, expiryDate.toISOString());

                navigate("/");

            };

            loginRequest();
        } else {
            setErrors(validationErrors);
        }
    };

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-12 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-8">Login</h2>
                <div className="mb-8">
                    <label htmlFor="email" className="block font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={`w-full p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
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
                <p className="text-red-500 text-lg">{errMsg}</p>
                <div className="flex flex-col mb-8">
                    <button className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                        Login
                    </button>
                    <Link to={'/'} className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;