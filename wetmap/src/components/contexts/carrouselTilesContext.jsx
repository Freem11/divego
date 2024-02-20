import { createContext, useState } from 'react';

export const CarrouselTilesContext = createContext('');

const CarrouselTilesContextProvider = ({children}) => {
    const [tiles, setTiles] = useState(false);

    return (
        <CarrouselTilesContext.Provider value={{ tiles, setTiles }}>
            {children}
        </CarrouselTilesContext.Provider>
    )
}

export default CarrouselTilesContextProvider;