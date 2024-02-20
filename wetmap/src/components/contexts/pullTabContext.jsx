import { createContext, useState } from 'react';

export const PullTabContext = createContext('');

const PullTabContextProvider = ({children}) => {
    const [showFilterer, setShowFilterer] = useState(false);

    return (
        <PullTabContext.Provider value={{ showFilterer, setShowFilterer }}>
            {children}
        </PullTabContext.Provider>
    )
}

export default PullTabContextProvider;