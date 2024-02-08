import { createContext, useState } from 'react';

export const ThirdTutorialModalContext = createContext('');

const ThirdTutorialModalContextProvider = ({children}) => {
    const [thirdGuideModal, setThirdGuideModal] = useState(false);

    return (
        <ThirdTutorialModalContext.Provider value={{ thirdGuideModal, setThirdGuideModal }}>
            {children}
        </ThirdTutorialModalContext.Provider>
    )
}

export default ThirdTutorialModalContextProvider;