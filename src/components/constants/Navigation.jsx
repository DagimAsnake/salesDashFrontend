import {
    HiOutlineViewGrid,
    HiOutlineCube,
    // HiOutlineShoppingCart,
    // HiOutlineUsers,
    // HiOutlineDocumentText,
    // HiOutlineAnnotation,
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
        label: 'sales',
        path: '/sales',
        icon: <HiOutlineCube />
    },
    // {
    //     key: 'orders',
    //     label: 'Orders',
    //     path: '/orders',
    //     icon: <HiOutlineShoppingCart />
    // },
    // {
    //     key: 'customers',
    //     label: 'Customers',
    //     path: '/customers',
    //     icon: <HiOutlineUsers />
    // },
    // {
    //     key: 'transactions',
    //     label: 'Transactions',
    //     path: '/transactions',
    //     icon: <HiOutlineDocumentText />
    // },
    // {
    //     key: 'messages',
    //     label: 'Messages',
    //     path: '/messages',
    //     icon: <HiOutlineAnnotation />
    // }
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