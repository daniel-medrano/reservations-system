import { useContext } from "react"
import { Nav } from "./nav"
import { useLocation, Navigate, Outlet } from "react-router"
import AuthContext from "@/context/AuthProvider"

interface RequireAuthProps {
    allowedRoles: string[]
}


export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
    console.log("useContext")
    const { auth } = useContext(AuthContext)
    console.log("end useContext")
    const location = useLocation()
    console.log(auth)
    return (
        <>
            {auth?.user?.roles?.find(role => allowedRoles.includes(role))
                ? <Outlet />
                : auth?.user
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/sign-in" state={{from: location}} replace />
            }
        </>
    );
};