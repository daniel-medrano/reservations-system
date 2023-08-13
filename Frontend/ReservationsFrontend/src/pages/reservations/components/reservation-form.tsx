

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { ReactNode } from "react"
import { Reservation } from "./columns"
import { Minus, Plus } from "lucide-react"

const formSchema = z.object({
    amountAdults: z.number(),
    amountChildren: z.number()
})

interface ReservationFormProps {
    disabled?: boolean
    reservation?: Reservation
    button?: ReactNode
}

export function ReservationForm({ reservation, button, disabled }: ReservationFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: (data, context, options) => {
            console.log("formData", data)
            console.log("validation result", zodResolver(formSchema))
            return zodResolver(formSchema)(data, context, options)
        },
        defaultValues: {
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