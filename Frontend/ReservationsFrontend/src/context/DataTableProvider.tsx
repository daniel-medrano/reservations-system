import { createContext, useState } from "react";

interface DataTableContextProps {
    changed: boolean
    setChanged: (changed: boolean) => void
}

const DataTableContext = createContext<DataTableContextProps>({} as DataTableContextProps)

interface DataTableProviderProps {
    children: JSX.Element | JSX.Element[]
}

export function DataTableProvider({ children }: DataTableProviderProps) {
    const [changed, setChanged] = useState(false)

    return (
        <DataTableContext.Provider value={{ changed, setChanged}}>
            {children}
        </DataTableContext.Provider>
    )
}

export default DataTableContext