import React, { createContext, useState } from 'react';

type SliderNumberContextType = {
  slideNum:    number
  setSlideNum: React.Dispatch<React.SetStateAction<number>>
};

const SliderNumberContextState = {
  slideNum:      0,
  setSlideNum: () => {},
};

export const SliderNumberContext = createContext<SliderNumberContextType>(
  SliderNumberContextState,
);

const SliderNumberContextProvider = ({ children }: any) => {
  const [slideNum, setSlideNum] = useState<number>(1);

  return (
    <SliderNumberContext.Provider value={{ slideNum, setSlideNum }}>
      {children}
    </SliderNumberContext.Provider>
  );
};

export default SliderNumberContextProvider;
