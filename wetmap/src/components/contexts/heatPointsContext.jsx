import { createContext, useState } from 'react';

export const HeatPointsContext = createContext('');

const HeatPointsContextProvider = ({children}) => {
    const [heatpts, setHeatPts] = useState([]);

    return (
        <HeatPointsContext.Provider value={{ heatpts, setHeatPts }}>
            {children}
        </HeatPointsContext.Provider>
    )
}

export default HeatPointsContextProvider;