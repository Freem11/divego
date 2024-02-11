import { createContext, useState } from 'react';

export const SliderContext = createContext('');

const SliderContextProvider = ({children}) => {
    const d = new Date();
    const [sliderVal, setSliderVal] = useState(d.getMonth() + 1);

    return (
        <SliderContext.Provider value={{ sliderVal, setSliderVal }}>
            {children}
        </SliderContext.Provider>
    )
}

export default SliderContextProvider;