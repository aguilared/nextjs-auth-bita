/* eslint-disable react/display-name */
"use client";
import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import useSWR from "swr";
//import BitacoraCard from "../../components/Bitacoras/BitacoraCard";
import AddBox from "@mui/material/Icon";
import ArrowDownward from "@mui/material/Icon";
import Check from "@mui/material/Icon";
import ChevronLeft from "@mui/material/Icon";
import ChevronRight from "@mui/material/Icon";
import Clear from "@mui/material/Icon";
import DeleteOutline from "@mui/material/Icon";
import Edit from "@mui/material/Icon";
import FilterList from "@mui/material/Icon";
import FirstPage from "@mui/material/Icon";
import LastPage from "@mui/material/Icon";
import Remove from "@mui/material/Icon";
import SaveAlt from "@mui/material/Icon";
import Search from "@mui/material/";
import ViewColumn from "@mui/material/Icon";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "bitacora_date", headerName: "Date", width: 130 },
  { field: "author_id", headerName: "Author", width: 130 },
  { field: "_count", headerName: "Totals", width: 130 },
  {
    field: "_count.bita_events",
    headerName: "Events",
    type: "number",
    width: 130,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const BitaEvents = (props: any): JSX.Element => {
  const { status, data, error, isLoading, refetch } = useQuery(
    ["bitacoras"],
    async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bitacora`);
      console.log("Bitacoras", res);
      return res.data;
    }
  );

  console.log("Data", data);

  return (
    <div className="flex rounded items-center justify-center flex-wrap p-2">
      <div className="shadow-lg ">
        {!data ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Author&nbsp;(g)</TableCell>
                  <TableCell align="right">Totals</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.bitacora_date}</TableCell>
                    <TableCell align="right">{row.author_id}</TableCell>
                    <TableCell align="right">
                      {row._count.bita_events}
                    </TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },
  avatar: {
    backgroundColor: red[500],
  },
};

export default BitaEvents;
