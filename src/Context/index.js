const { createContext, useState } = require("react");


export const AppContext = createContext();

export function AppContextProvider({children}){
    const [showMenu, setShowMenu] = useState(false);
    const [folders, setFolders] = useState([]);
    return(
        <AppContext.Provider value={{showMenu,setShowMenu,folders, setFolders}}>
            {children}
        </AppContext.Provider>
    )
}

