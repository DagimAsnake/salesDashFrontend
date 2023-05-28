import React, { useEffect, useState, useContext } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from "react-table";
import AdminAuthContext from "../store/Admin-authContext";

const AnalyticsTable = () => {
    const adminAuthCtx = useContext(AdminAuthContext);

    const [requestEmployee, setRequestEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch("http://localhost:8000/analytics", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminAuthCtx.token,
                },
            });
            const data = await response.json();
            console.log(data);
            setRequestEmployee(data.msg);
            setIsLoading(false);
        };
        fetchEmployee();
    }, [adminAuthCtx]);

    const columns = [
        {
            Header: "Product Name",
            accessor: "_id.productName",
        },
        {
            Header: "Sales",
            accessor: "totalAddedCost",
        },
        {
            Header: "Users",
            accessor: "totalUsers",
        },
        {
            Header: "Product Category",
            accessor: "_id.productType",
        },
    ];

    const Table = ({ columns, data }) => {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize, globalFilter },
            setGlobalFilter,
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0, pageSize: 10 },
            },
            useFilters,
            useGlobalFilter,
            useSortBy,
            usePagination
        );

        // const { globalFilter } = state;

        return (
            <>
                <div className="flex items-center mb-5">
                    <label htmlFor="search" className="mr-2">
                        Search:
                    </label>
                    <input
                        id="search"
                        type="text"
                        className="border border-gray-300 p-1"
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
                <table {...getTableProps()} className="w-full table-auto border border-gray-300 rounded-lg">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-4 py-2 text-left font-medium text-gray-700"
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={`${row.original.totalAddedCost === 0 ? "hidden" : ""}`}
                                >
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-4 py-2 text-left font-normal text-gray-700"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            className="px-2 py-1 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                        >
                            {"<<"}
                        </button>{" "}                     <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="px-2 py-1 border border-gray-300 hover:bg-gray-200"
                        >
                            {"<"}
                        </button>{" "}
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="px-2 py-1 border border-gray-300 hover:bg-gray-200"
                        >
                            {">"}
                        </button>{" "}
                        <button
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            className="px-2 py-1 border border-gray-300 rounded-r-lg hover:bg-gray-200"
                        >
                            {">>"}
                        </button>{" "}
                        <span className="ml-2">
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                    </div>
                    <div>
                        <select
                            className="border border-gray-300 px-2 py-1"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div >
            </>
        );
    };

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    <div className="h-8 w-8 ml-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-ping"></div>
                </div>
            )}
            <div className="my-8">
                <h2 className="text-lg font-medium mb-4 text-gray-800">Sales and User Data Table</h2>
                <div className="overflow-x-auto">
                    <Table columns={columns} data={requestEmployee} />
                </div>
            </div>
        </>
    );
};

export default AnalyticsTable;