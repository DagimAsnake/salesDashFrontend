
import React from 'react';

const ProductCategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    const handleCategoryChange = (event) => {
        onCategoryChange(event.target.value);
    };

    return (
        <div className="flex items-center mb-4">
            <label htmlFor="categoryFilter" className="mr-4 font-medium">
                Product Category:
            </label>
            <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-2 border rounded-md"
            >
                <option value="">All Categories</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
            </select>
        </div>
    );
};

export default ProductCategoryFilter;