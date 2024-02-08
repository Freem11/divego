import { createContext, useState } from 'react';

export const PictureContext = createContext('');

const PictureContextProvider = ({children}) => {
    const [photoFile, setPhotoFile] = useState(null);

    return (
        <PictureContext.Provider value={{ photoFile, setPhotoFile }}>
            {children}
        </PictureContext.Provider>
    )
}

export default PictureContextProvider;