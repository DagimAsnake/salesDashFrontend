import React from 'react';

const ProductDetails = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="bg-gray-100 p-4 rounded-md shadow-md max-w-lg mx-auto">
                <h2 className="text-lg font-medium mb-2">productName</h2>
                <div className="flex flex-wrap mb-2">
                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                        <span className="mr-4">
                            <strong>Type:</strong> productType
                        </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span>
                            <strong>Cost:</strong> cost
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap mb-2">
                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                        <span className="mr-4">
                            <strong>Sold:</strong> sold ? 'Yes' : 'No'
                        </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span>
                            <strong>Sold By:</strong> soldBy
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap mb-2">
                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                        <span className="mr-4">
                            <strong>Price:</strong> price
                        </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span>
                            <strong>Location:</strong> location
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;