import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineUsers,
    HiOutlineCog
} from 'react-icons/hi'
import { RiProductHuntLine } from "react-icons/ri"
import { MdProductionQuantityLimits } from "react-icons/md"
import { DiGoogleAnalytics } from "react-icons/di"


export const DashboardTop = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'sales',
        label: 'Sales',
        path: '/sales',
        icon: <HiOutlineCube />
    },
    {
        key: 'analytics',
        label: 'Analytics',
        path: '/analytics',
        icon: <DiGoogleAnalytics />
    },
    {
        key: 'users',
        label: 'Users',
        path: '/users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'addproduct',
        label: 'Add Products',
        path: '/addproducts',
        icon: <RiProductHuntLine />
    },
    {
        key: 'invproducts',
        label: 'Products',
        path: '/invproducts',
        icon: <MdProductionQuantityLimits />
    }
]

export const DashboardBottom = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
]