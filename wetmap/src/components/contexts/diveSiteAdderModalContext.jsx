import { createContext, useState } from 'react';

export const DiveSiteAdderModalContext = createContext('');

const DiveSiteAdderModalContextProvider = ({children}) => {
    const [dsAdderModal, setDsAddermodal] = useState(false);

    return (
        <DiveSiteAdderModalContext.Provider value={{ dsAdderModal, setDsAddermodal }}>
            {children}
        </DiveSiteAdderModalContext.Provider>
    )
}

export default DiveSiteAdderModalContextProvider;