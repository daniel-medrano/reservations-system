import { ReactNode, useContext, useState } from "react"
import { Reservation, Hotel, RoomType, Client } from "@/interfaces/interfaces"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Minus, Plus, Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { baseUrl } from "@/shared"
import AuthContext from "@/context/AuthProvider"
import DataTableContext from "@/context/DataTableProvider"

interface ReservationRequest {
    id?: number
    checkInDate: Date
    checkOutDate: Date
    amountAdults: number
    amountChildren: number
    notes?: string
    status: boolean
    hotelId: number
    roomTypeId: number
    clientId: number
}

function createReservation(reservation: ReservationRequest, token: string) {
    console.log(JSON.stringify(reservation))
    const url = baseUrl + "/reservations"
    fetch(url, {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
            "accept": "text/plain",
            "Authorization": "bearer " + token,
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}


function updateReservation(reservation: ReservationRequest, token: string) {
    console.log(JSON.stringify(reservation))
    const url = baseUrl + "/reservations"
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(reservation),
        headers: {
            "accept": "text/plain",
            "Authorization": "bearer " + token,
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

function getHotels(handleHotelsData: (data: Hotel[]) => void) {
    const url = baseUrl + "/hotels"
    fetch(url, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data: Hotel[]) => handleHotelsData(data))
}

function getRoomTypes(handleRoomTypesData: (data: RoomType[]) => void) {
    const url = baseUrl + "/roomtypes"
    fetch(url, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data: RoomType[]) => handleRoomTypesData(data))
}

function getClients(handleRoomTypesData: (data: Client[]) => void) {
    const url = baseUrl + "/clients"
    fetch(url, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data: Client[]) => handleRoomTypesData(data))
}

const formSchema = z.object({
    dateRange: z.object({
        from: z.date(),
        to: z.date({ required_error: "You must specify the check-out date." })
    }, { required_error: "You must specify the check-in and check-out dates." }),
    amountAdults: z.number(),
    amountChildren: z.number(),
    clientId: z.number().int(),
    roomTypeId: z.number().int(),
    hotelId: z.number().int(),
    status: z.boolean(),
    notes: z.string().optional()
})

interface ReservationFormProps {
    disabled?: boolean
    reservation?: Reservation
    button?: ReactNode
}

export function ReservationForm({ reservation, button, disabled }: ReservationFormProps) {
    const { changed, setChanged } = useContext(DataTableContext)
    const { auth } = useContext(AuthContext)

    const [openRoomTypes, setOpenRoomTypes] = useState(false)
    const [openClients, setOpenClients] = useState(false)
    const [openHotels, setOpenHotels] = useState(false)

    const [hotels, setHotels] = useState<Hotel[]>()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>()
    const [clients, setClients] = useState<Client[]>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dateRange: reservation == undefined ? undefined : {
                from: reservation.checkInDate,
                to: reservation.checkOutDate
            },
            hotelId: reservation?.hotelId ? reservation!.hotelId : undefined,
            roomTypeId: reservation?.room.roomType.id ? reservation!.room.roomType.id : undefined,
            clientId: reservation?.clientId ? reservation!.clientId : undefined,
            amountAdults: reservation?.amountAdults ?? 1,
            amountChildren: reservation?.amountChildren ?? 0,
            status: reservation?.status ?? false,
            notes: reservation?.notes ?? undefined
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!reservation) {
            createReservation({
                checkInDate: values.dateRange.from,
                checkOutDate: values.dateRange.to,
                amountAdults: values.amountAdults,
                amountChildren: values.amountChildren,
                notes: values.notes == "" ? undefined : values.notes,
                status: values.status,
                hotelId: values.hotelId,
                roomTypeId: values.roomTypeId,
                clientId: values.clientId
            }, auth!.token)
        } else {
            updateReservation({
                id: reservation!.id,
                checkInDate: values.dateRange.from,
                checkOutDate: values.dateRange.to,
                amountAdults: values.amountAdults,
                amountChildren: values.amountChildren,
                notes: values.notes == "" ? undefined : values.notes,
                status: values.status,
                hotelId: values.hotelId,
                roomTypeId: values.roomTypeId,
                clientId: values.clientId
            }, auth!.token)
        }

        setChanged(!changed)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="hotelId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel</FormLabel>
                            <FormControl>
                                <div className={cn("grid gap-2")}>
                                    <Popover open={openHotels} onOpenChange={setOpenHotels}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openHotels}
                                                className="w-[280px] justify-between"
                                                disabled={disabled}
                                                onClick={() => getHotels((data) => setHotels(data))}
                                            >
                                                {field.value
                                                    ? hotels?.find((hotel) => hotel.id == field.value)?.name ?? reservation?.hotel.name
                                                    : "Select hotel..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[280px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search hotel..." />
                                                <CommandEmpty>No hotel found.</CommandEmpty>
                                                <CommandGroup>
                                                    {!hotels ? ("Loading data...") : hotels.map((hotel) => (
                                                        <CommandItem
                                                            key={hotel.id}
                                                            value={hotel.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                console.log(currentValue)
                                                                field.onChange(Number(currentValue) === field.value ? undefined : Number(currentValue))
                                                                setOpenHotels(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === hotel.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {hotel.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormControl>
                            <FormDescription>
                                The hotel where the reservation will take place.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="roomTypeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room</FormLabel>
                            <FormControl>
                                <div className={cn("grid gap-2")}>

                                    <Popover open={openRoomTypes} onOpenChange={setOpenRoomTypes}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openRoomTypes}
                                                className="w-[280px] justify-between"
                                                disabled={disabled}
                                                onClick={() => getRoomTypes((data) => setRoomTypes(data))}
                                            >
                                                {field.value
                                                    ? roomTypes?.find((roomType) => roomType.id == field.value)?.name ?? reservation?.room.roomType.name
                                                    : "Select room..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[280px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search room..." />
                                                <CommandEmpty>No room found.</CommandEmpty>
                                                <CommandGroup>
                                                    {!roomTypes ? ("Loading data...") : roomTypes.map((roomType) => (
                                                        <CommandItem
                                                            key={roomType.id}
                                                            value={roomType.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                field.onChange(Number(currentValue) === field.value ? undefined : Number(currentValue))
                                                                setOpenRoomTypes(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === roomType.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {roomType.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormControl>
                            <FormDescription>
                                The room of the reservation.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                                <div className={cn("grid gap-2")}>
                                    <Popover open={openClients} onOpenChange={setOpenClients}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openClients}
                                                className="w-[280px] justify-between"
                                                disabled={disabled}
                                                onClick={() => getClients((data) => setClients(data))}
                                            >
                                                {field.value
                                                    ? clients?.find((client) => client.id == field.value)?.lastName ?? reservation?.client.lastName
                                                    : "Select client..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[280px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search client..." />
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                    {!clients ? ("Loading data...") : clients.map((client) => (
                                                        <CommandItem
                                                            key={client.id}
                                                            value={client.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                field.onChange(Number(currentValue) === field.value ? undefined : Number(currentValue))
                                                                setOpenClients(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === client.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {client.lastName}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormControl>
                            <FormDescription>
                                The client making the reservation.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Nights</FormLabel>
                                <FormControl>
                                    <div className={cn("grid gap-2")}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    disabled={disabled}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                {format(field.value.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start" onFocusOutside={(event) => event.preventDefault()}>
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={field.value?.from}
                                                    selected={field.value}
                                                    onSelect={(range) => {
                                                        if (range?.from != undefined && range.from.getTime() == range.to?.getTime()) return
                                                        field.onChange(range)
                                                    }}
                                                    numberOfMonths={2}
                                                    disabled={(day) => day < new Date(Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()))}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    The amount of nights.
                                </FormDescription>
                                <div className="text-sm font-medium text-destructive">
                                    {form.formState.errors.dateRange?.message ?? form.formState.errors.dateRange?.to?.message}
                                </div>
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="amountAdults"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adults</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <Button type="button" variant="outline" onClick={() => form.setValue("amountAdults", field.value == 1 ? field.value : field.value - 1)} disabled={field.value == 1 || disabled}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-center text-sm h-4 w-4">{field.value}</span>
                                    <Button type="button" variant="outline" onClick={() => form.setValue("amountAdults", field.value == 10 ? field.value : field.value + 1)} disabled={field.value == 10 || disabled}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription>
                                The amount of adults.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amountChildren"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Children</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <Button type="button" variant="outline" onClick={() => form.setValue("amountChildren", field.value == 0 ? 0 : field.value - 1)} disabled={field.value == 0 || disabled}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-center text-sm h-4 w-4">{field.value}</span>
                                    <Button type="button" variant="outline" onClick={() => form.setValue("amountChildren", field.value == 10 ? 10 : field.value + 1)} disabled={field.value == 10 || disabled}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription>
                                The amount of children.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Switch className="disabled:cursor-default" checked={field.value} disabled={disabled} onCheckedChange={(checked) => field.onChange(checked)} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                The status of the reservation.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Textarea className="disabled:cursor-default max-h-[500px]" placeholder="Type your notes here." {...field} disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                The notes of the reservation in case there are any extra details to be considered.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {disabled ? "" : (button ?? <Button type="submit">Save</Button>)}
            </form>
        </Form>
    )
}