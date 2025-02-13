import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const headerStatus = createContext();

const HeaderStatusContext = ({children}) => {
    const [headerVisible, setHeaderVisible] = useState(true);

    const path = useLocation().pathname;
    
    useEffect(()=>{
        if(path === "/login" || path === "/signup"){
            setHeaderVisible(false);
        }else{
            setHeaderVisible(true);
        }
    }, [path])

  return (
    <headerStatus.Provider value={{headerVisible, setHeaderVisible}}>
        {children}
    </headerStatus.Provider>
  )
}

export default HeaderStatusContext