import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "./TableCell";
import { BitaEvents } from "./types"; //type
import { EditCell } from "./EditCell";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<BitaEvents>();
const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};
export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("bitacora_id", {
    header: "BitaID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),

  columnHelper.accessor("tipoEvent.description", {
    header: "TipoEvent",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("event.description", {
    header: "Event",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("description", {
    header: "Info",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),

  columnHelper.accessor("image", {
    cell: (props) => {
      const imageURL = props.getValue();
      return `<img src={imageURL} alt={props.getValue()} />`;
    },
  }),

  columnHelper.accessor("bitacora.author.name", {
    header: "Author",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),

  columnHelper.accessor((row) => convertDate1(`${row.event_date}`), {
    id: "Date",
  }),

  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
