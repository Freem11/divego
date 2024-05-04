import { createContext, useState } from 'react';

export const SitesArrayContext = createContext('');

const SitesArrayContextProvider = ({children}) => {
    const [sitesArray, setSitesArray] = useState([]);

    return (
        <SitesArrayContext.Provider value={{ sitesArray, setSitesArray }}>
            {children}
        </SitesArrayContext.Provider>
    )
}

export default SitesArrayContextProvider;