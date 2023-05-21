import React from 'react'
import DashboardStatus from '../components/DashboardStatus'
import TransactionChart from '../components/TransactionChart'
import BuyerPieChart from '../components/BuyerPieChart'
import RecentOrders from '../components/RecentOrders'
import PopularProducts from '../components/PopularProducts'

function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatus />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerPieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div >
    )
}

export default Dashboard