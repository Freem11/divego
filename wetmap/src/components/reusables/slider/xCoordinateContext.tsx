import React, { createContext, useState } from 'react';

type XcoordinateContextType = {
  xCoordinate:    number
  setxCoordinate: React.Dispatch<React.SetStateAction<number>>
};

const XcoordinateContextState = {
  xCoordinate:      0,
  setxCoordinate: () => {},
};

export const XcoordinateContext = createContext<XcoordinateContextType>(
  XcoordinateContextState,
);

const XcoordinateContextProvider = ({ children }: any) => {
  const [xCoordinate, setxCoordinate] = useState<number>(0);

  return (
    <XcoordinateContext.Provider value={{ xCoordinate, setxCoordinate }}>
      {children}
    </XcoordinateContext.Provider>
  );
};

export default XcoordinateContextProvider;
