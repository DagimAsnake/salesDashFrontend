import React, { useEffect, useState, useContext } from "react";
import AdminAuthContext from "../store/Admin-authContext";
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

const SalesTable = () => {
  const adminAuthCtx = useContext(AdminAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8000/sales/", {
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

  const data = React.useMemo(() => requestEmployee, [requestEmployee]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product Name',
        accessor: '_id.productName',
      },
      {
        Header: 'Sales',
        accessor: 'totalAddedCost',
        sortType: 'basic',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data },
    useFilters,
    useSortBy,
    usePagination,
    initialState => ({ ...initialState, pageSize: 6 })
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter('_id.productName', value);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <div className="h-8 w-8 ml-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-ping"></div>
        </div>
      )}
      <div className="my-8 overflow-x-auto">
        <input
          className="my-4 px-4 py-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          placeholder="Search by product name..."
          onChange={handleFilterChange}
        />
        <table {...getTableProps()} className="w-full border-collapse table-auto sm:min-w-max">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border py-3 px-4 cursor-pointer font-medium text-gray-500 text-left uppercase tracking-wider"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {!isLoading &&
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`${row.original.totalAddedCost === 0 ? 'hidden' : ''}`}
                  >
                    {row.cells.map((cell) => (
                      <td className="border py-3 px-4 text-gray-700 font-medium" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="my-4 flex justify-between items-center">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {'<'}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {'>'}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>
          </div>
          <div>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className="border border-gray-300 px-2 py-1 rounded-md ml-2 w-20"
                min="1"
                max={pageOptions.length}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesTable;