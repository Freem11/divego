import { createContext, useState } from 'react';

export const Iterrator2Context = createContext('');

const Iterator2ContextProvider = ({children}) => {
    const [itterator2, setItterator2] = useState(null);

    return (
        <Iterrator2Context.Provider value={{ itterator2, setItterator2 }}>
            {children}
        </Iterrator2Context.Provider>
    )
}

export default Iterator2ContextProvider;