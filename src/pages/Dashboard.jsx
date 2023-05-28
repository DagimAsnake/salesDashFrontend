import React from 'react'
import DashboardStatus from '../components/Dashboard/DashboardStatus'
import TransactionChart from '../components/Dashboard/TransactionChart'
import BuyerPieChart from '../components/Dashboard/BuyerPieChart'

function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatus />
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3">
                    <TransactionChart />
                </div>
                <BuyerPieChart />
            </div>
        </div >
    )
}

export default Dashboard