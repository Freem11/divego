import { createContext, useState } from 'react';

export const PartnerModalContext = createContext('');

const PartnerModalContextProvider = ({children}) => {
    const [partnerModal, setPartnerModal] = useState(false);

    return (
        <PartnerModalContext.Provider value={{ partnerModal, setPartnerModal }}>
            {children}
        </PartnerModalContext.Provider>
    )
}

export default PartnerModalContextProvider;