import { createContext, useState } from 'react';

export const CoordsContext = createContext('');

const CoordsContextProvider = ({children}) => {
    const [mapCoords, setMapCoords] = useState([49.316666, -123.066666]);

    return (
        <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
            {children}
        </CoordsContext.Provider>
    )
}

export default CoordsContextProvider;