import { useState } from "react"

import { Plus, MoreHorizontal } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Reservation } from "./columns"

interface DetailsDialogProps {
    reservation?: Reservation
}

export function DetailsDialog({ reservation }: DetailsDialogProps) {
    const [mode, setMode] = useState<"view" | "add" | "modify" | "delete">("add")

    return (
        <Dialog>
            {
                reservation == null ?
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="md:mr-2 h-4 w-4" />
                            <span className="hidden md:inline-block">Add reservation</span>
                        </Button>
                    </DialogTrigger>
                    : <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(reservation!.id.toString())}>
                                Copy reservation ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => setMode("view")}>View</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => setMode("modify")}>Modify</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => setMode("delete")}>Delete</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
            }
            {
                mode != "delete" ?
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {mode.replace(mode[0], mode[0].toUpperCase())} reservation
                            </DialogTitle>
                            <DialogDescription>
                                {mode.replace(mode[0], mode[0].toUpperCase())} a reservation here.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amountAdults" className="text-right">
                                    Adults
                                </Label>
                                <Input id="amountAdults" defaultValue={mode != "add" ? reservation!.amountAdults : ""} disabled={mode == "view" ? true : false} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amountChildren" className="text-right">
                                    Children
                                </Label>
                                <Input id="amountChildren" defaultValue={mode != "add" ? reservation!.amountChildren : ""} disabled={mode == "view" ? true : false} className="col-span-3" />
                            </div>
                            
                        </div>
                        {
                            mode == "view" ? "" :
                                <DialogFooter>
                                    <Button type="submit">Save</Button>
                                </DialogFooter>
                        }
                    </DialogContent>
                    : <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Are you absolutely sure?
                            </DialogTitle>
                            <DialogDescription>
                                This action is irreversible and will permanently remove the selected item from our system. Please note that this cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive">Delete</Button>
                        </DialogFooter>
                    </DialogContent>}
        </Dialog>
    )
}