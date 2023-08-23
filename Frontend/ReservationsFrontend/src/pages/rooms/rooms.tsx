import { useContext, useEffect, useState } from "react"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import {
    PaginationState,
    SortingState
} from "@tanstack/react-table"
import { baseUrl } from "@/shared"
import AuthContext from "@/context/AuthProvider"
import { Client, Hotel, Reservation, Room, RoomType } from "@/interfaces/interfaces"
import DataTableContext from "@/context/DataTableProvider"
import { error } from "console"

interface RawRoom {
    id: number
    number: number
    status: boolean
    creationDate: Date
    roomType: RoomType
}

interface RawRooms {
    rooms: RawRoom[]
    totalCount: number
}

interface Rooms {
    rooms: Room[]
    totalCount: number
}

export default function Rooms() {
    const { changed } = useContext(DataTableContext)
    const [data, setData] = useState<Rooms>()
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

        const url = baseUrl + "/rooms?" + params
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "bearer " + auth!.token
            }
        })
            .then((response) => response.json())
            .then((data: RawRooms) => {
                console.log(data)
                data.totalCount
                    ? setData({
                        rooms: data.rooms.map((room) => ({
                            ...room,
                            roomType: room.roomType,
                            creationDate: new Date(room.creationDate)
                        })),
                        totalCount: data.totalCount
                    })
                    : null}).catch((error) => console.log(error))
    }, [changed, globalFilter, sortBy, pageIndex, pageSize])
    console.log(data)
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Rooms</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of all rooms
                        </p>
                    </div>
                </div>
                <div>
                    {data
                        ? <DataTable
                            columns={columns}
                            data={data.rooms}
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