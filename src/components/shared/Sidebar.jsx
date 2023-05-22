import React, { useContext } from 'react'
import { DashboardBottom, DashboardTop } from '../constants/Navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import AdminAuthContext from '../store/Admin-authContext'


const linkClasses = "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"

function Sidebar() {

    const adminAuthCtx = useContext(AdminAuthContext)

    const logoutHandler = () => {
        adminAuthCtx.logout()
    }

    return (
        <div className='flex flex-col bg-neutral-900 w-60 p-3 text-white'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24} />
                <span className='text-neutral-100 text-lg hidden sm:inline md:inline'>SalesDash</span>
            </div>
            <div className='flex-1'>
                <div className='grid grid-cols-1 gap-1'>
                    {DashboardTop.map((item) => {
                        return (
                            <SidebarLink key={item.key} item={item} />
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                {DashboardBottom.map((item) => {
                    return (
                        <SidebarLink key={item.key} item={item} />
                    )
                })}
                <div onClick={logoutHandler} className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className='text-xl'><HiOutlineLogout /></span>
                    <span className='hidden sm:inline md:inline'> Logout</span>
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname === item.path ? "text-white bg-neutral-700" : "text-neutral-400", linkClasses)}>
            <span className='text-xl'>{item.icon}</span>
            <span className='hidden sm:inline md:inline'>{item.label}</span>
        </Link>
    )
}

export default Sidebar