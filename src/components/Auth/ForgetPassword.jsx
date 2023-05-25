import React, { useState } from "react";
import { Link } from 'react-router-dom'

const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [isLinkSent, setIsLinkSent] = useState("");
    const [errors, setErrors] = useState({});
    const [isPending, setIsPending] = useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPending(true)
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const loginRequest = async () => {
                const response = await fetch("http://localhost:8000/auth/forgetpassword", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
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
                setIsPending(false)
                setIsLinkSent(data.msg);

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
        return errors;
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="sm:w-1/3">
                <form onSubmit={handleSubmit} className="bg-white p-12 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-8">Forget Password</h2>
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
                    <p className="text-red-500 text-lg">{isLinkSent}</p>
                    <div className="flex flex-col mb-8">
                        {!isPending && <button className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                            Submit
                        </button>}
                        {isPending && <button disabled className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                            Submiting
                        </button>}
                        <Link to={'/login'} className="text-blue-500 hover:underline">
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;