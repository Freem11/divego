import { createContext, useState } from 'react';

export const TutorialContext = createContext('');

const TutorialContextProvider = ({children}) => {
    const [tutorialRunning, setTutorialRunning] = useState(false);

    return (
        <TutorialContext.Provider value={{ tutorialRunning, setTutorialRunning }}>
            {children}
        </TutorialContext.Provider>
    )
}

export default TutorialContextProvider;