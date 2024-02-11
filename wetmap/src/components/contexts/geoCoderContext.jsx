import { createContext, useState } from 'react';

export const GeoCoderContext = createContext('');

const GeoCoderContextProvider = ({children}) => {
    const [showGeoCoder, setShowGeoCoder] = useState(false);

    return (
        <GeoCoderContext.Provider value={{ showGeoCoder, setShowGeoCoder }}>
            {children}
        </GeoCoderContext.Provider>
    )
}

export default GeoCoderContextProvider;