import {Link} from "react-router-dom"

export function Menu(){
    return (
        <body>
            <nav className="menu">
                <Link to="/"> Home </Link>
                <Link to="/about"> About </Link>
                <Link to="/Rooms"> Rooms </Link>
                <Link to="/Log in"> Log in </Link>
            
            </nav>
        </body>
    );
}