import { createContext, useState } from 'react';

export const AnimalContext = createContext('');

const AnimalContextProvider = ({children}) => {
    const [animalVal, setAnimalVal] = useState([]);

    return (
        <AnimalContext.Provider value={{ animalVal, setAnimalVal }}>
            {children}
        </AnimalContext.Provider>
    )
}

export default AnimalContextProvider;