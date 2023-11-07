"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

//import getBitaEventId from "../../../../../services/getBitaEventId";
import getBitaEventId from "../../../../services/getBitaEventId.js";
import dayjs from "dayjs";
import Interweave from "interweave";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "../../../../components/Container";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const BitaEventCard = ({ params }): JSX.Element => {
  const [bitacora_id, setBitacora_id] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");

  const ENDPOINT =
    process.env.NEXT_PUBLIC_API_URL + "bitacora/event_id/" + params.id;
  console.log("ENDPOINT ", ENDPOINT);
  const { status, data, isError, isLoading, refetch } = useQuery(
    ["EventId"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      console.log("RES", res);

      return res.data;
    }
  );

  useEffect(() => {
    if (params) {
      if (status === "success") {
        console.log("====================================");
        console.log("renders");
        console.log("====================================");
        setBitacora_id(data.bitacora_id);
        setBitacoraDate(data.event_date);
        setAuthor(data.bitacora.author.name);
        setTipoEvent(data.tipoEvent.description);
        setEvent(data.event.description);
        setDescription(data.description);
      }
    }
  }, [data, params, status]);

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        Error
      </div>
    );
  }
  if (data) {
    console.log("DATA", data);
  }

  return (
    <Container>
      <div className="container max-w-4xl m-auto px-4 mt-20">
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        <Card Card sx={{ maxWidth: 645 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <div>
              <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                Reporte de un evento especifico de una Bitacoraaaa.
              </h3>
            </div>
            <Typography variant="h6" component="div">
              ID Bitacora: {data.bitacora_id}, ID BitaEvent: {params.id}, Fecha:{" "}
              {convertDate1(data.bitacoraDate)}
            </Typography>{" "}
            <Typography variant="h6" component="div">
              Author: {data.bitacora.author.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Tipo Event: {data.tipoEvent.description}, Event:{" "}
              {data.event.description}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="h2">
              <Interweave content={data.description} />
            </Typography>
          </CardContent>
          <div className="container max-w-4xl m-auto px-4 mt-20">
            <Image
              src={"/" + `${params.id}` + ".jpg"}
              alt="Image"
              width={1920 / 3}
              height={1280 / 3}
            />
          </div>
          <div className="container max-w-4xl m-auto px-4 mt-20">
            <Image
              src={"/images/" + `${params.id}` + ".jpg"}
              alt="Image"
              width={1920 / 3}
              height={1280 / 3}
            />
          </div>
          <div className="container max-w-4xl m-auto px-4 mt-20">
            <Image
              src={"/images/" + `${params.id}` + "_2.jpg"}
              alt="Image"
              width={1920 / 2}
              height={1280 / 2}
            />
          </div>
        </Card>
      </div>
    </Container>
  );
};

BitaEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEventCard);
