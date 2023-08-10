import { useState } from "react"

import { Reservation, columns } from "./components/columns"
import { DataTable } from "./components/data-table"


import {
    PaginationState,
    SortingState
} from "@tanstack/react-table"


function getData(pageIndex: number, pageSize: number, sortBy: string): Reservation[] {
    const reservations = [
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
            amountAdults: 1,
            amountChildren: 2,
            status: true
        }
    ]
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
    return reservations.slice(pageIndex * pageSize - pageSize, pageIndex * pageSize)
}


export default function Reservations() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 10 })
    const [sorting, setSorting] = useState<SortingState>([])
    const sortBy = sorting[0]?.desc ? "-" + sorting[0].id : sorting[0]?.id

    const data = getData(pageIndex, pageSize, sortBy)

    return (
        <>
            <div className="container mx-auto py-10"><h1>Reservations</h1></div>
            <div className="container mx-auto">
                <DataTable
                    columns={columns}
                    data={data}
                    totalCount={12}
                    pagination={{ pageIndex, pageSize }}
                    setPagination={setPagination} 
                    sorting={sorting}
                    setSorting={setSorting} />
            </div>

        </>
    )
}