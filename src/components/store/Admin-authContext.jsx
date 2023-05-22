import React, { useState } from 'react'

const AdminAuthContext = React.createContext({
    token: "",
    isAdminLoggedIn: false,
    login: (token) => { },
    logout: () => { }
})

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

export const AdminAuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("AdminToken")
    const [token, setToken] = useState(initialToken)
    const AdminIsLoggedIn = !!token

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("AdminToken")
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem("AdminToken", token)

        const remainingTime = calculateRemainingTime(expirationTime)
        setTimeout(logoutHandler, remainingTime)
    }

    const AdminContextValue = {
        token: token,
        isAdminLoggedIn: AdminIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AdminAuthContext.Provider value={AdminContextValue}>
            {props.children}
        </AdminAuthContext.Provider>
    )

}

export default AdminAuthContext