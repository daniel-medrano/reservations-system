import { Icons } from "@/assets/icons"

import { useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "@/context/AuthProvider"

export function Nav() {
    const { auth, setAuth } = useContext(AuthContext)
    const location = useLocation()

    function signOut() {
        setAuth(null)
        localStorage.clear()
    }

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
            <div className="container flex h-14 items-center space-x-6">
                <div className="flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <Icons.logo className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            Las Mareas
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link to="/chatbot" className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/chatbot" ? "text-foreground" : "text-foreground/60"
                        )}>
                            Chatbot
                        </Link>
                        <Link to="/rooms" className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/rooms" ? "text-foreground" : "text-foreground/60"
                        )}>
                            Rooms
                        </Link>
                        { auth?.user?.roles.find((role) => ["Employee", "Admin"].includes(role)) && <Link to="/reservations" className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/reservations" ? "text-foreground" : "text-foreground/60"
                        )}>
                            Reservations
                        </Link>}
                        <Link to="/about" className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/about" ? "text-foreground" : "text-foreground/60"
                        )}>
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {auth?.user
                            ? <Link to="#" className={cn(
                                "transition-colors hover:text-foreground/80",
                                location.pathname === "/sign-in" ? "text-foreground" : "text-foreground/60"
                            )} onClick={signOut}>
                                Sign out
                            </Link>
                            : <Link to="/sign-in" className={cn(
                                "transition-colors hover:text-foreground/80",
                                location.pathname === "/sign-in" ? "text-foreground" : "text-foreground/60"
                            )}>
                                Sign in
                            </Link>
                        }
                        
                    </nav>
                </div>
            </div>
        </div>);
}