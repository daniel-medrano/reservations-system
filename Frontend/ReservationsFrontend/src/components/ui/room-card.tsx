import r1 from "@/assets/rooms/r1.jpg"
import { DatePickerWithRange } from "@/components/date-picker-range"
import { Button } from "@/components/ui/button"
import { RoomType } from "@/interfaces/interfaces"
import { Link } from 'react-router-dom'

interface RoomCardProps {
    roomType: RoomType
}

const RoomCard = ({ roomType }: RoomCardProps) => {
    return (   
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="p-2 grid grid-cols-4"> 
                
                <div className=" col-span-1">
                    <img 
                    src= {r1} 
                    className="rounded-md"
                    />
                </div>

                <div className="col-span-2 flex flex-col justify-start ">
                    <h2 className="pl-4 text-xl font-semibold ">{roomType.name}</h2>
                    <p className="pl-4 text-gray-500 text-start "> 
                        {roomType.description}
                    </p>
                </div>

                <div className="px-8 col-span-1 flex flex-col justify-start">
                    <h2 className="pl-8 pt-2 pb-4 text-xl font-semibold text-center">Pick a date.</h2>
                    <DatePickerWithRange />

                    <div className="pl-8 pt-8 col-span-1 flex flex-col justify-start">            
                        <Button asChild> 
                            <Link to="/payments"> Make a reservation</Link>  
                        </Button>
                    </div>
                </div>

            

            </div>
        </div>
    )
}

export default RoomCard