"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DebouncedInput from "@/components/DebouncedInput";
import { SearchIcon } from "@/components/Icons/Icons";

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "item",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Item",
    }),

    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Id",
    }),
    columnHelper.accessor("bitacora_date", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Date",
    }),
    columnHelper.accessor("author_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Author",
    }),
    columnHelper.accessor("_count.bita_events", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total",
    }),
    columnHelper.accessor("visits", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Visits",
    }),
    columnHelper.accessor("progress", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Progress",
    }),
  ];

  const { status, data, error, isLoading, refetch } = useQuery(
    ["bitacoras"],
    async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bitacora`);
      console.log("Bitacoras", res);
      return res.data;
    }
  );

  console.log("Data", data);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="pt-4 min-h-screen bg-gray-900">
      <div className="p-2 max-w-5xl mx-auto fill-gray-400">
        {!data ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="flex justify-between mb-2">
            <div className="w-full flex justify-center items-center">
              <p className="text-xl">List BitaEvents</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div className="justify-right items-center">
                <DebouncedInput
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  className="p-2 font-lg shadow border rounded"
                  placeholder="Search all columns..."
                />
              </div>
              <div className="w-full flex justify-left items-left">
                <button
                  type="submit"
                  onClick={() => abrirModalSearchs()}
                  className="absolute w-10 h-10 rounded-full inline p-2 shadow"
                >
                  {" "}
                  <svg
                    className="text-gray-100 w-6 h-6 fill-current"
                    viewBox="0 0 56.966 56.966"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
            <table className="border border-gray-700 w-full text-left">
              <thead className="bg-indigo-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="capitalize px-3.5 py-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3.5 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr className="text-center h-32">
                    <td colSpan={12}>No Recoard Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* pagination */}
            <div className="flex items-center justify-end mt-2 gap-2">
              <button
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
                className="p-1 border border-gray-300 px-2 disabled:opacity-30"
              >
                {"<"}
              </button>
              <button
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
                className="p-1 border border-gray-300 px-2 disabled:opacity-30"
              >
                {">"}
              </button>

              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16 bg-transparent"
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="p-2 bg-transparent"
              >
                {[10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TanStackTable;
