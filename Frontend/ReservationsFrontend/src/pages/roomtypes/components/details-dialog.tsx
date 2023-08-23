import { useContext, useState } from "react"

import { Plus, MoreHorizontal } from "lucide-react"

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
import { Reservation } from "@/interfaces/interfaces"
import { ReservationForm } from "./reservation-form"
import AuthContext from "@/context/AuthProvider"
import DataTableContext from "@/context/DataTableProvider"
import { baseUrl } from "@/shared"

function deleteReservation(id: number, token: string) {
    const url = baseUrl + "/reservations/" + id
    fetch(url, {
        method: "DELETE",
        headers: {
            "accept": "text/plain",
            "Authorization": "bearer " + token,
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

interface DetailsDialogProps {
    reservation?: Reservation
}

export function DetailsDialog({ reservation }: DetailsDialogProps) {
    const { changed, setChanged } = useContext(DataTableContext)
    const { auth } = useContext(AuthContext)
    const [mode, setMode] = useState<"view" | "add" | "modify" | "delete">("add")
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                reservation == null
                    ? <DialogTrigger asChild>
                        <Button>
                            <Plus className="md:mr-2 h-4 w-4" />
                            <span className="hidden md:inline-block">Add room type</span>
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
                mode != "delete"
                    ? <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[80%]">
                        <DialogHeader>
                            <DialogTitle>
                                {mode.replace(mode[0], mode[0].toUpperCase())} reservation
                            </DialogTitle>
                            <DialogDescription>
                                {mode.replace(mode[0], mode[0].toUpperCase())} a reservation here.
                            </DialogDescription>
                        </DialogHeader>
                        <ReservationForm
                            disabled={mode === "view" ? true : false}
                            reservation={mode != "add" ? reservation : undefined}
                            button={<DialogFooter>
                                <Button type="submit" onClick={() => {
                                    setOpen(false)
                                }}>Save</Button>
                            </DialogFooter>
                            }
                        />
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
                            <Button variant="destructive" onClick={() => {
                                deleteReservation(reservation!.id, auth!.token)
                                setChanged(!changed)
                                setOpen(false)
                            }}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>}
        </Dialog>
    )
}