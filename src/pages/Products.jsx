import React from 'react'
import RecentOrders from '../components/RecentOrders'
import PopularProducts from '../components/PopularProducts'

function Products() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div></div>
    )
}

export default Products