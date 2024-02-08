import { createContext, useState } from 'react';

export const AnchorModalContext = createContext('');

const AnchordModalContextProvider = ({children}) => {
    const [siteModal, setSiteModal] = useState(false);

    return (
        <AnchorModalContext.Provider value={{ siteModal, setSiteModal }}>
            {children}
        </AnchorModalContext.Provider>
    )
}

export default AnchordModalContextProvider;