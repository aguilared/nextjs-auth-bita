"use client";
import { useEffect, useReducer, useState } from "react";
import "./table.css";
import Container from "@/components/Container";

import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

import { columns } from "./columns";
import { FooterCell } from "./FooterCell";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  id: number;
  search: number;
};

export type Student = {
  id: number;
  bitacora_date: string;
  author_id: string;
  total: string;
};

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const App = () => {
  const rerender = useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();
  const [datafilter, setDatafilter] = useState([]);

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

  useEffect(() => {
    if (status === "success") {
      console.log("====================================");
      console.log("renders");
      console.log("====================================");
      setDatafilter(data);
    }
  }, [data, status]);

  const [editedRows, setEditedRows] = useState({});
  const [bitacoraSearch, setBitacoraSearch] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Search bitacora
  const handleSearchOnChange = (e) => {
    console.log("valueOmChangee", e.target.value);
    setBitacoraSearch(e.target.value);
  };

  const abrirModalSearchs = () => {
    const value = bitacoraSearch;

    if (!value || value === "") {
      return setDatafilter(data); //retorna a la data original
    }
    console.log("DATA", data);
    //filtrando la data al hacer un search
    const newData = data.filter(
      (bitacora: any) => bitacora.id === Number(value)
    );
    console.log("newDATA", newData);

    return setDatafilter(newData);
  };

  const table = useReactTable({
    data: datafilter,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <Container>
        <div className="w-full flex justify-center items-center">
          <p className="text-xl">List BitaEvents</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form>
            <div>
              <input
                className="rounded py-2 px-4"
                type="text"
                placeholder="Search"
                defaultValue=""
                {...register("search", {
                  required: "Required",
                  minLength: 3,
                  maxLength: 41,
                })}
                onChange={handleSearchOnChange}
              />
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
          </form>

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </div>
        <div className="absolute  w-full flex justify-center items-center">
          <article>
            {!datafilter ? (
              <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
              </div>
            ) : (
              <table className="lg:table-fixed">
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
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() =>
                        router.push(`/bitacora/view/${row.original.id}`)
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      colSpan={table.getCenterLeafColumns().length}
                      align="right"
                    >
                      <FooterCell table={table} />
                    </th>
                  </tr>
                </tfoot>
              </table>
            )}{" "}
            <div className="h-2" />
            <div className="flex items-center gap-2">
              <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
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
                  className="border p-1 rounded w-16"
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
            <div>
              <button onClick={() => rerender()}>Force Rerender</button>
            </div>
            <div>
              <button onClick={() => refreshData()}>Refresh Data</button>
            </div>
            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
            {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
          </article>

          <table className="md:table-fixed">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default App;
