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

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("bitacora_id", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
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
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Image",
    }),
    columnHelper.accessor("bitacora.author.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Author",
    }),
  ];

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
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
      {isLoading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300" />
        </div>
      ) : (
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
          <table className="lg:table-auto shadow-lg border">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white text-xs">
              {table.getRowModel().rows.map((row) => (
                <tr
                  className={"bg-white text-xs"}
                  key={row.id}
                  onClick={() =>
                    router.push(`/bitacora/bita_event/${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={"text-gray-800 text-xs"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TanStackTable;
