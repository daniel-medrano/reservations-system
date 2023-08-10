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