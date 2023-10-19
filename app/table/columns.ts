import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "./TableCell";
import { Bitacora } from "./data"; //type
import { EditCell } from "./EditCell";

const columnHelper = createColumnHelper<Bitacora>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("bitacora_date", {
    header: "Date",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("author_id", {
    header: "Author",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("author.name", {
    header: "AuthorName",
    cell: TableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("_count.bita_events", {
    header: "Events",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("major", {
    header: "Major",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
