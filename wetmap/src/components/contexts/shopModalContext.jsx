import { createContext, useState } from 'react';

export const ShopModalContext = createContext('');

const ShopModalContextProvider = ({children}) => {
    const [shopModal, setShopModal] = useState(false);

    return (
        <ShopModalContext.Provider value={{ shopModal, setShopModal }}>
            {children}
        </ShopModalContext.Provider>
    )
}

export default ShopModalContextProvider;