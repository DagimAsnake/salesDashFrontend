import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
            <Sidebar />
            <div className='flex-1 h-screen flex flex-col'>
                <Header />
                <div className='p-4 min-h-0 overflow-auto'>{<Outlet />}</div>
            </div>
        </div>
    )
}

export default Layout