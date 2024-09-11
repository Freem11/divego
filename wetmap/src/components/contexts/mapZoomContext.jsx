import { createContext, useState } from 'react';

export const ZoomContext = createContext('');

const ZoomContextProvider = ({children}) => {
    const [mapZoom, setMapZoom] = useState(15);

    return (
        <ZoomContext.Provider value={{ mapZoom, setMapZoom }}>
            {children}
        </ZoomContext.Provider>
    )
}

export default ZoomContextProvider;