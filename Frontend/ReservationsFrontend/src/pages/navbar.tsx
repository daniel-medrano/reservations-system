import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

import {Link} from "react-router-dom"

export function NavBar(){
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/about">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/rooms">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Rooms
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/login">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Log in
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>



        // <nav className="menu">
        //     <Link to="/"> Home </Link>
        //     <Link to="/about"> About </Link>
        //     <Link to="/Rooms"> Rooms </Link>
        //     <Link to="/Log in"> Log in </Link>
        
        // </nav>
    );
}