import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
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
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalCount: number
    pagination: PaginationState,
    setPagination: OnChangeFn<PaginationState>
    sorting: SortingState
    setSorting: OnChangeFn<SortingState>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting
}: DataTableProps<TData, TValue>) {
    const { pageIndex, pageSize } = pagination
    let pageCount = Math.ceil(totalCount / pageSize)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    console.log(columnFilters)
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    console.log(columnVisibility)
    const [rowSelection, setRowSelection] = useState({})
    let selectedRowsCount = Object.keys(rowSelection).length

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // onPaginationChange: setPagination,
        // getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: pageCount,
        manualSorting: true,
        onSortingChange: setSorting,
        // getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId: (_originalRow, index, _parent) => {
            return (index + pageSize * (pageIndex - 1)).toString()
        },
        getFacetedRowModel: getFacetedRowModel(),
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
        debugTable: true
    })
    console.log(table.getFilteredSelectedRowModel().rows)
    console.log("Page size: " + pageSize.toString())
    return (
        <div>
            <div className="flex items-center py-4">
                <Input placeholder="Search..." className="max-w-sm" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
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
            <div className="flex items-center justify-between px-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {selectedRowsCount} of{" "}
                    {totalCount} row(s) selected.
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium"> Rows per page</p>
                        <Select value={pageSize.toString()} onValueChange={(value) => setPagination({ pageIndex: pageIndex, pageSize: Number(value) })}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((itemPageSize) => (
                                    <SelectItem key={itemPageSize} value={itemPageSize.toString()}>
                                        {itemPageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {pageIndex} of {pageCount}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setPagination({ pageIndex: 1, pageSize })} disabled={pageIndex == 1}>
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPagination({ pageIndex: pageIndex - 1, pageSize })} disabled={pageIndex == 1}>
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPagination({ pageIndex: pageIndex + 1, pageSize })} disabled={pageIndex == pageCount}>
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPagination({ pageIndex: pageCount, pageSize })} disabled={pageIndex == pageCount}>
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}