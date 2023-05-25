import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from '../components/store/Admin-authContext'

const UpdatePassword = () => {
    const adminAuthCtx = useContext(AdminAuthContext);

    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [isPending, setIsPending] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();

        setIsPending(true)

        const signupDepartment = async () => {
            const response = await fetch(
                "http://localhost:8000/auth/changepassword",
                {
                    method: "POST",
                    body: JSON.stringify({
                        oldpassword: oldPassword,
                        confirm_password: confirmPassword,
                        new_password: newPassword,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + adminAuthCtx.token,
                    },
                }
            );

            if (!response.ok) {
                console.log("something is wrong");
            }

            const data = await response.json();

            console.log(data);
            setIsPending(false)
            setErrMsg(data.msg);

            if (data.msg === "Password Changed Successfully") {
                navigate("/profile");
            }
        };

        signupDepartment();
    };
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
                        <div className="text-lg text-center text-black font-bold">
                            Change Password
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">Old Password</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder="Old Password"
                                        type="password"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                            </div>

                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">New Password</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        type="password"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                            </div>

                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">Confirm Password</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                            </div>

                            <p className="text-red-500 text-lg">{errMsg}</p>

                            <div className="w-44 items-center text-center text-black rounded-lg hover:bg-black my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                                {!isPending && <button> Submit</button>}
                                {isPending && <button disabled> Submiting</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword