import { createContext, useState } from 'react';

export const AnimalRevealContext = createContext('');

const AnimalRevealContextProvider = ({children}) => {
    const [showAnimalSearch, setShowAnimalSearch] = useState(false);

    return (
        <AnimalRevealContext.Provider value={{ showAnimalSearch, setShowAnimalSearch }}>
            {children}
        </AnimalRevealContext.Provider>
    )
}

export default AnimalRevealContextProvider;