import React, { createContext, useState} from 'react';

export const CustomContext = createContext();

const Context = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false); //context for checking if user is authenticated
    const [currentUserInfo, setCurrentUserInfo] = useState({}); //context for current signed in users name
    const [selected, setSelected] = useState([]); //from the task table to select all to delete
    return <CustomContext.Provider value ={{authenticated, setAuthenticated, currentUserInfo, setCurrentUserInfo, selected, setSelected}}> {children}</CustomContext.Provider>
    
}

export default Context;