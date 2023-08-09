import { ColumnDef } from "@tanstack/react-table"

export type Reservation = {
    id: number
    creationDate: Date
    amountAdults: number
    amountChildren: number
    status: boolean
}

export const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: "creationDate",
        header: "Created at"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "amountAdults",
        header: "Adults"
    },
    {
        accessorKey: "amountChildren",
        header: "Children"
    }
]