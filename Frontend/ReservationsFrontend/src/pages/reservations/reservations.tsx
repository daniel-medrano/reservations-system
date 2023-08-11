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
            amountAdults: 2,
            amountChildren: 2,
            status: true
        },
        {
            id: 2,
            creationDate: new Date("08-08-2023"),
            amountAdults: 2,
            amountChildren: 1,
            status: true
        },
        {
            id: 3,
            creationDate: new Date("07-08-2023"),
            amountAdults: 3,
            amountChildren: 2,
            status: true
        },
        {
            id: 4,
            creationDate: new Date("06-08-2023"),
            amountAdults: 1,
            amountChildren: 2,
            status: true
        },
        {
            id: 5,
            creationDate: new Date("04-08-2022"),
            amountAdults: 1,
            amountChildren: 2,
            status: true
        },
        {
            id: 6,
            creationDate: new Date("09-08-2021"),
            amountAdults: 1,
            amountChildren: 2,
            status: true
        },
        {
            id: 7,
            creationDate: new Date("09-08-2023"),
            amountAdults: 2,
            amountChildren: 2,
            status: true
        },
        {
            id: 8,
            creationDate: new Date("08-08-2023"),
            amountAdults: 2,
            amountChildren: 1,
            status: true
        },
        {
            id: 9,
            creationDate: new Date("07-08-2023"),
            amountAdults: 3,
            amountChildren: 2,
            status: true
        },
        {
            id: 10,
            creationDate: new Date("06-08-2023"),
            amountAdults: 1,
            amountChildren: 2,
            status: true
        },
        {
            id: 11,
            creationDate: new Date("04-08-2022"),
            amountAdults: 1,
            amountChildren: 2,
            status: true
        },
        {
            id: 12,
            creationDate: new Date("09-08-2021"),
            amountAdults: 2,
            amountChildren: 2,
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
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of the reservations
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