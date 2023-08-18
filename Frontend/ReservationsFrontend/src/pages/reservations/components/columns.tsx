import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { DetailsDialog } from "./details-dialog"

export interface Reservation {
    id: number
    checkInDate: Date
    checkOutDate: Date
    creationDate: Date
    amountAdults: number
    amountChildren: number
    notes: string
    status: boolean
}

export const columns: ColumnDef<Reservation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"/>
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row"/>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "creationDate",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Created at
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: "checkInDate",
        header: "Check-in"
    },
    {
        accessorKey: "checkOutDate",
        header: "Check-out"
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">Status</div>, // Example
        cell: ({ row }) => {
            const formatted = row.getValue("status") ? "Active" : "Inactive"
            return <div className="text-right font-medium">{formatted}</div>
        } // Example
    },
    {
        accessorKey: "amountAdults",
        header: "Adults"
    },
    {
        accessorKey: "amountChildren",
        header: "Children"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const reservation = row.original

            return (
                <DetailsDialog reservation={reservation}/>
            )
        }
    }
]