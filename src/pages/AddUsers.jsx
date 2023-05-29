import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

const AddUser = () => {
    const adminAuthCtx = useContext(AdminAuthContext)

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Employee");
    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState("")
    const [isPending, setIsPending] = useState(false)

    const handlefirstnameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handlelastnameChange = (event) => {
        setLastname(event.target.value);
    };

    const handleusernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        setRole("Employee");
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPending(true)
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const loginRequest = async () => {
                const response = await fetch("http://localhost:8000/user/post", {
                    method: "POST",
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password,
                        role: role,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + adminAuthCtx.token,
                    },
                });

                if (!response.ok) {
                    console.log("something is wrong");
                    console.log(response)
                }

                const data = await response.json();
                console.log(data);
                setIsPending(false)
                setErrMsg(data.msg);

                navigate("/users");

            };

            loginRequest();
        } else {
            setErrors(validationErrors);
        }

    };

    const validate = () => {
        const errors = {};
        if (!firstname) {
            errors.firstname = "Firstname is required";
        }
        if (!lastname) {
            errors.lastname = "lastname is required";
        }
        if (!username) {
            errors.username = "username is required";
        }
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
        <div className="flex flex-col justify-center items-center  bg-gray-100">
            <div className="sm:w-1/2">
                <form onSubmit={handleSubmit} className="bg-white p-12 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-8">Register</h2>
                    <div className="grid grid-cols-2 gap-10">
                        <div className="">
                            <label htmlFor="firstname" className="block font-medium mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                onChange={handlefirstnameChange}
                                required
                                className={`w-full p-3 border rounded-md ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
                        </div>
                        <div className="">
                            <label htmlFor="lastname" className="block font-medium mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={handlelastnameChange}
                                required
                                className={`w-full p-3 border rounded-md ${errors.lastname ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
                        </div>
                        <div className="">
                            <label htmlFor="username" className="block font-medium mb-2">
                                username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleusernameChange}
                                required
                                className={`w-full p-3 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>
                        <div className="">
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
                    </div>
                    <p className="text-red-500 text-lg">{errMsg}</p>
                    <div className="flex flex-col mb-8">
                        {!isPending && <button className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                            Register
                        </button>}
                        {isPending && <button disabled className="bg-blue-500 text-white py-3 mb-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                            Registering
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;