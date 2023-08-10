import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons"

import { Table } from "@tanstack/react-table"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

interface DataTablePaginationProps<TData> {
    totalCount: number
    table: Table<TData>
}

export function DataTablePagination<TData>({
    totalCount,
    table
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {Object.keys(table.getState().rowSelection).length} of{" "}
                {totalCount} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium"> Rows per page</p>
                    <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(value) => table.setPageSize(Number(value))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
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
                    Page {totalCount ? table.getState().pagination.pageIndex + 1 : 0} of {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}