
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-picker-range"
 
export function About (){ 
    return  (
    <>
    <div className="flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <h1> About </h1>
        <Button> Hola </Button>

        <DatePickerWithRange />
    </div>

    </>
    )
}