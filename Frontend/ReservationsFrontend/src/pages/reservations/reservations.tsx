import { Reservation, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

 function getData(): Reservation[] {
    return [
        {
            id: 1,
            creationDate: new Date("09-08-2023"),
            amountAdults: 2,
            amountChildren: 2,
            status: true
        }
    ]
}


export default function Rervations() {
    const data = getData()

    return (
        <>
            <div className="container mx-auto py-10"><h1>Reservations</h1></div>
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>

        </>
    )
}