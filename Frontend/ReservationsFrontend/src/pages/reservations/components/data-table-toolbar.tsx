import { DataTableViewOptions } from "./data-table-view-options"
import { DetailsDialog } from "./details-dialog"

import { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Search..."
                value={table.getState().globalFilter}
                onChange={(event) => { table.setPageIndex(0); table.setGlobalFilter(event.target.value) }}
                className="max-w-sm" />
            <DataTableViewOptions table={table} />
            <DetailsDialog />
        </div>
    )
}