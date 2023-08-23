import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { DetailsDialog } from "./details-dialog"
import { Hotel, Reservation } from "@/interfaces/interfaces"

export const columns: ColumnDef<Hotel>[] = [
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
        header: "Description"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "postalCode",
        header: "Postal Code"
    },
    {
        accessorKey: "email",
        header: "Email"
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
            const hotel = row.original

            return (
                <div></div>
            )
        }
    }
]