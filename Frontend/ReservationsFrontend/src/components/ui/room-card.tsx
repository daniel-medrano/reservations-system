import r1 from "@/assets/rooms/r1.jpg"
import { DatePickerWithRange } from "@/components/date-picker-range"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const RoomCard = () => {
    return (   
        <div className="pt-6 grid grid-cols-4"> 
            
            <div className="pl-8 col-span-1">
                <img 
                src= {r1} 
                className="rounded-md"
                />
            </div>

            <div className="col-span-2 flex flex-col justify-start ">
                <h2 className="pl-4 text-xl font-semibold ">Suite doble</h2>
                <p className="pl-4 text-gray-500 text-base "> 
                ¡estas suites están diseñadas para ser su hogar lejos de su hogar! 
                Nuestras suites Nanku son perfectas para parejas, familias o grupos pequeños. 
                Ofrecen un área para dormir con una cama King o dos camas Queen y una amplia sala de estar con dos sofás cama individuales. 
                Un amplio baño y una terraza o balcón completan la unidad, convirtiéndola en el lugar perfecto para relajarse después 
                de un largo día de aventuras.

                </p>
            </div>

            <div className="pl-4 col-span-1 flex flex-col justify-start">
            <h2 className="pl-4 text-xl font-semibold ">Ingrese fecha de ingreso y salida</h2>
                <DatePickerWithRange />
            </div>

            <div className="pl-7 col-span-4 flex flex-col justify-start">
            
            <Button asChild> 
                <Link to="/payments"> Reservar</Link>  
            </Button>
            </div>

            
        </div>
    )
}

export default RoomCard