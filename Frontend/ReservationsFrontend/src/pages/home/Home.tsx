import roca from "@/assets/roca.jpg"
import { Icons } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

export function Home (){
    return (
    <>
    <div className="pt-4 bg-gray-100  flex items-center">
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="pt-4 grid grid-cols-2">
                <div className="pl-8 col-span-1">
                    <h1 className="text-3xl font-semibold mb-4">Welcome to Hotel Las Mareas</h1>
                    <p className="text-gray-600 mb-6">
                        Experience luxury and comfort in the heart of paradise. In Las Mareas you can experience the gorgeous views of a tropical
                        country. Relax at the song of the sea with
                        refreshing beverages, practice sports such as surfing or volleyball and more!
                    </p>        
                </div>

                <div className="pl-8 col-span-1 justify-center">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Contact us</h2>
                    <div className="pt-2 grid grid-cols-4">
                        <div className="pl-2 col-span-1">
                            <Link to="https://www.facebook.com/">    
                                <Button variant="outline" type="button" >                               
                                    <Icons.facebook className="mr-2 h-4 w-4" />
                                    FaceBook
                                </Button>
                            </Link>
                        </div>

                        <div className="pl-2 col-span-1 justify-end">
                            <Link to="https://twitter.com/"> 
                                <Button variant="outline" type="button" >                               
                                    <Icons.twitter className="mr-2 h-4 w-4" />
                                    Twitter
                                </Button>
                            </Link>
                        </div>

                        <div className="pl-2 col-span-1 justify-end">
                            <Link to="https://www.instagram.com/">
                                <Button variant="outline" type="button" >                               
                                    <Icons.instagram className="mr-2 h-4 w-4" />
                                    Instagram
                                </Button>
                            </Link>
                        </div>

                        <div className="pl-2 col-span-1 justify-end">
                            <Link to="https://web.whatsapp.com/">
                                <Button variant="outline" type="button" >                               
                                    <Icons.whatsapp className="mr-2 h-4 w-4" />
                                    What's App
                                </Button>
                            </Link>
                        </div>

                     </div>
                </div>

            </div>
            
           
        </div>
    </div>
    
    <div className="pt-4 bg-gray-100  flex items-center justify-center">
        <div className="pt-4 rounded-lg">
            <img 
            src= {roca} 
            className="rounded-md"
            />
        </div>
    </div>
    </>
    )
}