import React, { createContext, useState} from 'react';

export const CustomContext = createContext();

const Context = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false); //context for checking if user is authenticated
    const [currentUserInfo, setCurrentUserInfo] = useState({}); //context for current signed in users name
    return <CustomContext.Provider value ={{authenticated, setAuthenticated, currentUserInfo, setCurrentUserInfo}}> {children}</CustomContext.Provider>
    
}

export default Context;