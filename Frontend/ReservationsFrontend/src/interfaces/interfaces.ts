export interface Reservation {
    id: number
    checkInDate: Date
    checkOutDate: Date
    creationDate: Date
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

export interface Hotel {
    id: number
    name: string
    description: string
    address: string
    postalCode: string
    phone: number
    email: string
    status: boolean
    reservations?: Reservation[]
}

export interface Room {
    id: number
    number: number
    status: boolean
    creationDate: Date
    roomType: RoomType
}

export interface RoomType {
    id: number
    name: string
    description: string
    price: number
    status: boolean
}

export interface Client {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: number
    creationDate: Date
}

export interface ClientResponse {
    clients: Client[]
    totalCount: number
}

export interface HotelResponse {
    hotels: Hotel[]
    totalCount: number
}

export interface RoomTypeResponse {
    roomTypes: RoomType[]
    totalCount: number
}