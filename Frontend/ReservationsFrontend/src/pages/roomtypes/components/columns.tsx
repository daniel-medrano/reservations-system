import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { DetailsDialog } from "./details-dialog"
import { Client, Hotel, Reservation, Room, RoomType } from "@/interfaces/interfaces"

export const columns: ColumnDef<RoomType>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: "price",
        header: "Price"
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
        id: "actions",
        cell: ({ row }) => {
            const roomType = row.original

            return (
                <div></div>
            )
        }
    }
]