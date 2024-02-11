import { createContext, useState } from 'react';

export const IterratorContext = createContext('');

const IteratorContextProvider = ({children}) => {
    const [itterator, setItterator] = useState(null);

    return (
        <IterratorContext.Provider value={{ itterator, setItterator }}>
            {children}
        </IterratorContext.Provider>
    )
}

export default IteratorContextProvider;