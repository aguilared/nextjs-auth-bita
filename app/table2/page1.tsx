"use client";
import { useEffect, useState } from "react";
import { datas as defaultData } from "./data";
import "./table.css";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

export const Table = () => {
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

  const [datas, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
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
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow: Student = {
          studentId: Math.floor(Math.random() * 10000),
          name: "",
          dateOfBirth: "",
          major: "",
        };
        const setFunc = (old: Student[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Student[]) =>
          old.filter((_row: Student, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: Student[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  return (
    <>
      {" "}
      <div className="absolute  w-full flex justify-center items-center">
        <p className="text-xl">List BitaEvents</p>
      </div>
      <div className="flex-grow text-left px-3 py-1 m-2">
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
      </div>
      <article className="table-container">
        {!datafilter ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : (
          <table>
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
                <th colSpan={table.getCenterLeafColumns().length} align="right">
                  <FooterCell table={table} />
                </th>
              </tr>
            </tfoot>
          </table>
        )}
        {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
      </article>
    </>
  );
};

export default Table;
