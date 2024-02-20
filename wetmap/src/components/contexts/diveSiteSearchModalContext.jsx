import { createContext, useState } from 'react';

export const DiveSiteSearchModalContext = createContext('');

const DiveSiteSearchModalContextProvider = ({children}) => {
    const [diveSiteSearchModal, setDiveSiteSearchModal] = useState(false);

    return (
        <DiveSiteSearchModalContext.Provider value={{ diveSiteSearchModal, setDiveSiteSearchModal }}>
            {children}
        </DiveSiteSearchModalContext.Provider>
    )
}

export default DiveSiteSearchModalContextProvider;