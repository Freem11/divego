import { createContext, useState } from 'react';

export const ZoomHelperContext = createContext('');

const ZoomHelperContextProvider = ({children}) => {
    const [zoomHelper, setZoomHelper] = useState(false);

    return (
        <ZoomHelperContext.Provider value={{ zoomHelper, setZoomHelper }}>
            {children}
        </ZoomHelperContext.Provider>
    )
}

export default ZoomHelperContextProvider;