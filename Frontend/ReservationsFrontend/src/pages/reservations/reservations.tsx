import { useContext, useEffect, useState } from "react"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import {
    PaginationState,
    SortingState
} from "@tanstack/react-table"
import { baseUrl } from "@/shared"
import AuthContext from "@/context/AuthProvider"
import { Client, Hotel, Reservation, Room } from "@/interfaces/interfaces"
import DataTableContext, { DataTableProvider } from "@/context/DataTableProvider"

interface RawReservation {
    id: number
    checkInDate: string
    checkOutDate: string
    creationDate: string
    amountAdults: number
    amountChildren: number
    notes: string
    status: boolean
    hotelId: number
    hotel: Hotel
    roomId: number
    room: Room
    clientId: number
    client: Client
}

interface RawReservations {
    reservations: RawReservation[]
    totalCount: number
}

interface Reservations {
    reservations: Reservation[]
    totalCount: number
}

export default function Reservations() {
    const { changed } = useContext(DataTableContext)
    const [data, setData] = useState<Reservations>()
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const sortBy = (sorting[0]?.desc ? "-" + sorting[0].id : sorting[0]?.id) ?? ""
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        let params = new URLSearchParams({
            query: globalFilter,
            sortBy: sortBy,
            pageIndex: (pageIndex + 1).toString(),
            pageSize: pageSize.toString()
        })
        let emptyParams: string[] = []
        params.forEach((value, key) => {
            if (value == "")
                emptyParams.push(key)
        })
        emptyParams.forEach((value) => {
            params.delete(value)
        })

        const url = baseUrl + "/reservations?" + params
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "bearer " + auth!.token
            }
        })
            .then((response) => response.json())
            .then((data: RawReservations) =>
                data.totalCount
                    ? setData({
                        reservations: data.reservations.map((reservation) => {
                            return {
                                ...reservation,
                                creationDate: new Date(reservation.creationDate),
                                checkInDate: new Date(reservation.checkInDate),
                                checkOutDate: new Date(reservation.checkOutDate)
                            }
                        }),
                        totalCount: data.totalCount
                    })
                    : null)
    }, [changed, globalFilter, sortBy, pageIndex, pageSize])

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
                    {data
                        ? <DataTable
                            columns={columns}
                            data={data.reservations}
                            totalCount={data.totalCount}
                            pagination={{ pageIndex, pageSize }}
                            setPagination={setPagination}
                            sorting={sorting}
                            setSorting={setSorting}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        : <span>An error occured, could not fetch data.</span>
                    }
                </div>
            </div>
        </>
    )
}