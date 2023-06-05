import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "../components/store/Admin-authContext";

function AddProducts() {
    const adminAuthCtx = useContext(AdminAuthContext)

    const navigate = useNavigate()

    const [productName, setProductName] = useState("");
    const [productSpecification, setProductSpecification] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [shelfNumber, setShelfNumber] = useState("");
    const [warehouseNumber, setWarehouseNumber] = useState("");
    const [productType, setProductType] = useState("");
    const [safetyType, setSafetyType] = useState("");
    const [measuringInput, setMeasuringInput] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [productUsability, setProductUsability] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = async () => {
            const response = await fetch("http://localhost:8000/product/addprodcut", {
                method: "POST",
                body: JSON.stringify({
                    productName: productName,
                    productSpecification: productSpecification,
                    productType: productType,
                    warehouseNumber: warehouseNumber,
                    productQuantity: productQuantity,
                    shelfNumber: shelfNumber,
                    safetyType: safetyType,
                    measuringInput: measuringInput,
                    expireDate: expireDate,
                    productUsability: productUsability
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminAuthCtx.token,
                },
            });

            if (!response.ok) {
                console.log("something is wrong");
                console.log(response)
            }

            const data = await response.json();
            console.log(data);

            navigate("/invproducts");

        };

        loginRequest();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid grid-cols-2 gap-4 bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 col-span-2">Add a Product</h2>
            <div className="mb-4 col-span-2">
                <label htmlFor="productName" className="block font-medium mb-2">
                    Product Name
                </label>
                <input
                    id="productName"
                    type="text"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="productSpecification" className="block font-medium mb-2">
                    Product Specification
                </label>
                <input
                    id="productSpecification"
                    type="text"
                    value={productSpecification}
                    onChange={(event) => setProductSpecification(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="productQuantity" className="block font-medium mb-2">
                    Product Quantity
                </label>
                <input
                    id="productQuantity"
                    type="number"
                    value={productQuantity}
                    onChange={(event) => setProductQuantity(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="shelfNumber" className="block font-medium mb-2">
                    Shelf Number
                </label>
                <input
                    id="shelfNumber"
                    type="text"
                    value={shelfNumber}
                    onChange={(event) => setShelfNumber(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="warehouseNumber" className="block font-medium mb-2">
                    Warehouse Number
                </label>
                <input
                    id="warehouseNumber"
                    type="text"
                    value={warehouseNumber}
                    onChange={(event) => setWarehouseNumber(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="productType" className="block font-medium mb-2">
                    Product Type
                </label>
                <input
                    id="productType"
                    type="text"
                    value={productType}
                    onChange={(event) => setProductType(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="safetyType" className="block font-medium mb-2">
                    Safety Type
                </label>
                <input
                    id="safetyType"
                    type="text"
                    value={safetyType}
                    onChange={(event) => setSafetyType(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="measuringInput" className="block font-medium mb-2">
                    Measuring Input
                </label>
                <input
                    id="measuringInput"
                    type="text"
                    value={measuringInput}
                    onChange={(event) => setMeasuringInput(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="expireDate" className="block font-medium mb-2">
                    Expire Date
                </label>
                <input
                    id="expireDate"
                    type="date"
                    value={expireDate}
                    onChange={(event) => setExpireDate(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4 col-span-2">
                <label htmlFor="productUsability" className="block font-medium mb-2">
                    Product Usability
                </label>
                <input
                    id="productUsability"
                    type="text"
                    value={productUsability}
                    onChange={(event) => setProductUsability(event.target.value)}
                    className="border-gray-300 border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4 col-span-2">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </div>
        </form>
    );
}

export default AddProducts;