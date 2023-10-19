"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { withStyles, makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import Interweave from "interweave";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import getBitacora from "../../../../services/getBitacora";

const convertDate = (date: any) => {
  var d = dayjs(date).format("DD-MM-YYYY");
  return d;
};

const App = ({ params }) => {
  const [totalEvents, setTotalEvents] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");

  const getBitacoraNew = useCallback(async () => {
    if (params.id) {
      //console.log("no hay Idbitacora va a cargar", params.id);
      // //load idhistoria to global
    }
    await getBitacora(params.id).then((resp) => {
      setAuthor(resp.author.name);
      setBitacoraDate(resp.bitacora_date);
      setTotalEvents(resp._count.bita_events);
    });
  }, [setAuthor, params]);

  useEffect(() => {
    getBitacoraNew();
  }, [getBitacoraNew]);

  return (
    <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
      <div className="bg-white shadow-lg ">
        <div className="flex justify-between p-1">
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              &nbsp;
            </h3>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Bitacora Personal # {params.id}, Events:{totalEvents}
            </h3>
          </div>
          <div className="p-2">
            <ul className="flex">
              <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="text-sm">Author</span>
                <span className="text-sm">{author}</span>
              </li>
              <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">{convertDate(bitacoraDate)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
