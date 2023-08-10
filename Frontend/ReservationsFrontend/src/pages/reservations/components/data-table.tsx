import { useState } from "react"

import { DataTablePagination } from "./data-table-pagination"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    MixerHorizontalIcon
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    PaginationState,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    useReactTable,
    OnChangeFn
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalCount: number
    pagination: PaginationState,
    setPagination: OnChangeFn<PaginationState>
    sorting: SortingState
    setSorting: OnChangeFn<SortingState>
    globalFilter: string
    setGlobalFilter: OnChangeFn<string>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    let pageCount = Math.ceil(totalCount / pagination.pageSize)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        pageCount: pageCount,
        manualSorting: true,
        onSortingChange: setSorting,
        manualFiltering: true,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId: (_originalRow, index, _parent) => {
            return (index + pagination.pageSize * pagination.pageIndex).toString()
        },
        getFacetedRowModel: getFacetedRowModel(),
        state: {
            pagination,
            sorting,
            globalFilter,
            columnVisibility,
            rowSelection
        },
        debugTable: true
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(event) => { table.setPageIndex(0); setGlobalFilter(event.target.value) }}
                    className="max-w-sm" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination totalCount={totalCount} table={table} />
        </div>
    )
}