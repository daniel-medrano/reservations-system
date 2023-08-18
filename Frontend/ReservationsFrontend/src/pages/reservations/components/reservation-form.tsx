import { ReactNode, useState } from "react"
import { Reservation } from "./columns"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Minus, Plus, Calendar as CalendarIcon } from "lucide-react"

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

import { DateRange } from "react-day-picker"


const formSchema = z.object({
    dateRange: z.object({
        from: z.date(),
        to: z.date()
    }),
    amountAdults: z.number(),
    amountChildren: z.number()
})

interface ReservationFormProps {
    disabled?: boolean
    reservation?: Reservation
    button?: ReactNode
}

export function ReservationForm({ reservation, button, disabled }: ReservationFormProps) {
    const [date, setDate] = useState<DateRange | undefined>( reservation == undefined ? undefined : {
        from: reservation.checkInDate,
        to: reservation.checkOutDate,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: (data, context, options) => {
            data.dateRange.from = date?.from as Date
            data.dateRange.to = date?.to as Date
            console.log("formData", data)
            console.log("validation result", zodResolver(formSchema))
            return zodResolver(formSchema)(data, context, options)
        },
        defaultValues: {
            dateRange: { from: reservation?.checkInDate, to: reservation?.checkOutDate },
            amountAdults: reservation?.amountAdults ?? 1,
            amountChildren: reservation?.amountChildren ?? 0
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="dateRange"
                    render={() => {
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
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                    disabled={disabled}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "LLL dd, y")} -{" "}
                                                                {format(date.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "LLL dd, y")
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
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={(range) => {
                                                        if (range?.from != undefined && range.from.getTime() == range.to?.getTime()) return
                                                        setDate(range)
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
                                <FormMessage />
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
                {disabled ? "" : (button ?? <Button type="submit">Save</Button>)}
            </form>
        </Form>
    )
}