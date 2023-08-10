import { useState } from "react"

import { Reservation, columns } from "./components/columns"
import { DataTable } from "./components/data-table"


import {
    PaginationState
} from "@tanstack/react-table"


function getData(pageIndex: number, pageSize: number): Reservation[] {
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
        }
    ]

    return reservations.slice(pageIndex * pageSize - pageSize, pageIndex * pageSize)
}


export default function Reservations() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 4 })
    console.log(pageIndex)
    const data = getData(pageIndex, pageSize)

    return (
        <>
            <div className="container mx-auto py-10"><h1>Reservations</h1></div>
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} pageCount={3} pagination={{ pageIndex, pageSize }} setPagination={setPagination} />
            </div>

        </>
    )
}