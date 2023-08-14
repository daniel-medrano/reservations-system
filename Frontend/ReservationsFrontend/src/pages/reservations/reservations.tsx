import { useState } from "react"

import { Reservation, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import {
    PaginationState,
    SortingState
} from "@tanstack/react-table"

interface DataResponse {
    data: Reservation[]
    totalCount: number
}


function getData(query: string, sortBy: string, pageIndex: number, pageSize: number): DataResponse {
    let reservations = [
        {
            id: 1,
            creationDate: new Date("09-08-2023"),
            checkInDate: new Date("08-12-2023"),
            checkOutDate: new Date("08-14-2023"),
            amountAdults: 2,
            amountChildren: 2,
            notes: "This is a test.",
            status: true
        }
    ]

    reservations = reservations.filter((reservation) => reservation.amountAdults.toString().includes(query) || reservation.amountChildren.toString().includes(query))

    switch (sortBy) {
        case "creationDate":
            reservations.sort((a, b) => Number(a.creationDate) - Number(b.creationDate))
            break;
        case "-creationDate":
            reservations.sort((a, b) => Number(b.creationDate) - Number(a.creationDate))
            break;
        default:
            reservations.sort((a, b) => Number(a.id) - Number(b.id))
            break;
    }
    return {
        data: reservations.slice((pageIndex + 1) * pageSize - pageSize, (pageIndex + 1) * pageSize),
        totalCount: reservations.length
    }
}


export default function Reservations() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const sortBy = sorting[0]?.desc ? "-" + sorting[0].id : sorting[0]?.id


    const { data, totalCount } = getData(globalFilter, sortBy, pageIndex, pageSize)

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of all reservations
                        </p>
                    </div>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                        totalCount={totalCount}
                        pagination={{ pageIndex, pageSize }}
                        setPagination={setPagination}
                        sorting={sorting}
                        setSorting={setSorting}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>
            </div>
        </>
    )
}