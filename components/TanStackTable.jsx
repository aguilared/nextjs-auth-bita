"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { USERS } from "../data";
import { useState } from "react";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import { SearchIcon } from "../Icons/Icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

const convertDate1 = (date) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("event_date", {
      cell: (info) => <span>{convertDate1(info.getValue())}</span>,
      header: "Date",
    }),
    columnHelper.accessor("bitacora_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "BITAID",
    }),
    columnHelper.accessor("tipoEvent.description", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "TipoEvent",
    }),
    columnHelper.accessor("event.description", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Event",
    }),
    columnHelper.accessor("description", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Info",
    }),

    columnHelper.accessor("image", {
      cell: (info) =>
        info.getValue() ? (
          <div>
            <img
              height={34}
              src={`/${info.row.original.id}.jpg`}
              alt={`${info.row.original.id}.jpg`}
            />
          </div>
        ) : (
          "Not"
        ),
      header: "Image?",
    }),

    columnHelper.accessor("bitacora.author.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Author",
    }),
  ];

  const convertDate1 = (date) => {
    var d = dayjs(date).format("D-M-YY h:mm");
    return d;
  };

  const { status, data, error, isLoading, refetch } = useQuery(
    ["bitaEvents"],
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}bitacora/events`
      );
      console.log("BitaEveents", res);
      return res.data;
    }
  );

  //const [data] = useState(() => [...USERS]);
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

  if (error) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200" />
        Error
      </div>
    );
  }
  if (data) {
    console.log("DATA", data);
  }

  return (
    <div className="relative overflow-x-auto max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div>
          <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            ></svg>
          </span>
        </div>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          Writes Upside-Down
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>
      {isLoading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300" />
        </div>
      ) : (
        <>
          <>
            <div className="flex justify-between mb-2">
              <div className="w-full flex items-center gap-1">
                <SearchIcon />
                <DebouncedInput
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
                  placeholder="Search all columns..."
                />
              </div>
              <DownloadBtn data={data} fileName={"peoples"} />
            </div>
            <>
              <table className="min-w-full text-center text-sm font-light">
                {" "}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  {" "}
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} scope="col" class="px-6 py-3">
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
                        className={`${
                          i % 2 === 0
                            ? "bg-gray-300 text-slate-900 dark:text-gray-300"
                            : "bg-gray-500 "
                        }`}
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
            </>
          </>
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
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
        </>
      )}
    </div>
  );
};

export default TanStackTable;
