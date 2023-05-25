import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiBriefcase,
    // HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'


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
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'users',
        label: 'Users',
        path: '/users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'products',
        label: 'Products',
        path: '/products',
        icon: <HiBriefcase />
    }
]

export const DashboardBottom = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    // {
    //     key: 'support',
    //     label: 'Help & Support',
    //     path: '/support',
    //     icon: <HiOutlineQuestionMarkCircle />
    // }
]