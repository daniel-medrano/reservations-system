import { createContext, useEffect, useState } from "react"

export interface Auth {
    user: {
        email: string
        roles: string[]
    }
    token: string
}

interface AuthContextProps {
    auth: Auth | null
    setAuth: (auth: Auth | null) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[]
}

export function AuthProvider({ children }: AuthProviderProps) {
    const data = localStorage.getItem("auth")
    const json = data != null ? JSON.parse(data) : null

    const [auth, setAuth] = useState<Auth | null>(json ? {
        user: {
            email: json.email,
            roles: json.roles
        },
        token: json.token
    } : null)


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext