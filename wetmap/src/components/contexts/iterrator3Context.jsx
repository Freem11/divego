import { createContext, useState } from 'react';

export const Iterrator3Context = createContext('');

const Iterator3ContextProvider = ({children}) => {
    const [itterator3, setItterator3] = useState(null);

    return (
        <Iterrator3Context.Provider value={{ itterator3, setItterator3 }}>
            {children}
        </Iterrator3Context.Provider>
    )
}

export default Iterator3ContextProvider;