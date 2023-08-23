import RoomCard from "@/components/ui/room-card"
import { RoomType, RoomTypeResponse } from "@/interfaces/interfaces"
import { baseUrl } from "@/shared"
import { useEffect, useState } from "react"


function getRoomTypes(handleRoomTypesData: (data: RoomTypeResponse) => void) {
    const url = baseUrl + "/roomtypes"
    fetch(url, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data: RoomTypeResponse) => handleRoomTypesData(data))
}

export function AvailableRoomTypes() {
    const [data, setData] = useState<RoomType[]>()
    useEffect(() => {
        getRoomTypes((data) => setData(data.roomTypes))
    }, [])

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Available room types</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of all available room types
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    {data
                        ? data.map((roomType) => (
                            <RoomCard roomType={roomType} />
                        ))
                        : <span>An error occured, could not fetch data.</span>
                    }
                </div>
            </div>
        </>

    )
}