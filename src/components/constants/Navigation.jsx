import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineUsers,
    // HiOutlineDocumentText,
    HiOutlineCog
} from 'react-icons/hi'
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
    // {
    //     key: 'transactions',
    //     label: 'Transactions',
    //     path: '/transactions',
    //     icon: <HiOutlineDocumentText />
    // },
    {
        key: 'products',
        label: 'Products',
        path: '/products',
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