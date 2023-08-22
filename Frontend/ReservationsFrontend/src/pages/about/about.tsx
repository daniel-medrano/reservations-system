import view from "@/assets/view.jpg"
import loby from "@/assets/loby.png"
import pool from "@/assets/pool.jpg"


export function About() {
    return (
    <>
    <div className="bg-gray-100 min-w-full px-8 pt-8">
      <div className="max-w-4xl min-w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="pl-16 text-3xl font-semibold mb-4 text-center pb-8">Hotel Las Mareas</h1>
        
        <div className="px-8 grid grid-cols-3"> 
            
            <div className="pl-8 col-span-1">
                <img 
                src= {view} 
                className="rounded-md"
                />
            </div>

            <div className="px-16 col-span-2 flex flex-col justify-center ">
                <p className="text-gray-600 mb-6 text-center">
                At Hotel Las Mareas, we believe in providing unparalleled luxury and comfort to our guests. 
                With a rich history spanning over a decade, we've been dedicated to creating memorable experiences 
                for travelers from around the world.
                </p>
            </div>

        </div>
        

        


    
      </div>
    </div>

    <div className="bg-gray-100 min-w-full px-8 pt-8">
        <div className="max-w-4xl min-w-full bg-white p-6 rounded-lg shadow-lg">      

        <div className="px-8 grid grid-cols-3"> 
            <div className="px-16 col-span-2 flex flex-col justify-center items-center h-full"> 
                <p className="text-gray-600 mb-6 text-center">
                Our team is committed to delivering exceptional hospitality that makes your stay a truly remarkable one. 
                From our elegantly designed rooms to our world-class pools, every detail is meticulously crafted 
                to ensure your complete satisfaction.
                </p>
            </div>
            <div className="pl-8 col-span-1">
                <img 
                src={pool} 
                alt="Pool"
                className="rounded-md"
                />
            </div>
        </div>


        </div>
    </div>

    <div className="bg-gray-100 min-w-full px-8  pt-8">
        <div className="max-w-4xl min-w-full bg-white p-6 rounded-lg shadow-lg">

        <div className="px-8 grid grid-cols-3"> 
            
            <div className="pl-8 col-span-1">
                <img 
                src= {loby} 
                className="rounded-md"
                />
            </div>

            <div className="px-16 col-span-2 flex flex-col justify-center ">
                <p className="text-gray-600 text-center">
                Whether you're traveling for business or leisure, we strive to exceed your expectations and provide a 
                haven of serenity in the heart of paradise. Thank you for choosing Hotel Las Mareas for your journey.
                </p>
            </div>

        </div>

        </div>
    </div>
    </>
    )
}