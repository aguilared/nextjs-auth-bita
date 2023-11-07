import axios from "axios";
// const ENDPOINT = "http://localhost:3000/api/bitacora/event_id/";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/event_id/";

export default async function getbitaEventId(bitaeventId) {
  console.log("ID", bitaeventId);
  try {
    const resp = await axios.get(`${ENDPOINT}${bitaeventId}`);
    console.log("RESPServidor", resp);
    return resp.data;
  } catch (error) {
    console.log("ERROR BITACORA", error);
    return error;
  }
}
