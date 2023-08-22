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
import DataTableContext from "@/context/DataTableProvider"
import { error } from "console"

interface RawClient {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: number
    creationDate: string
}

interface RawClients {
    clients: RawClient[]
    totalCount: number
}

interface Clients {
    clients: Client[]
    totalCount: number
}

export default function Clients() {
    const { changed } = useContext(DataTableContext)
    const [data, setData] = useState<Clients>()
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

        const url = baseUrl + "/clients?" + params
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "bearer " + auth!.token
            }
        })
            .then((response) => response.json())
            .then((data: RawClients) => {
                console.log(data)
                data.totalCount
                    ? setData({
                        clients: data.clients.map((client) => ({
                            ...client,
                            creationDate: new Date(client.creationDate)
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
                        <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of all clients
                        </p>
                    </div>
                </div>
                <div>
                    {data
                        ? <DataTable
                            columns={columns}
                            data={data.clients}
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