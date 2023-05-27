import React from 'react'
import DashboardStatus from '../components/Dashboard/DashboardStatus'
import TransactionChart from '../components/Dashboard/TransactionChart'
import BuyerPieChart from '../components/Dashboard/BuyerPieChart'

function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatus />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerPieChart />
            </div>
        </div >
    )
}

export default Dashboard