import { createContext, useState } from 'react';

export const MinorContext = createContext('');

const MinorContextProvider = ({ children }) => {
  const [minorSwitch, setMinorSwitch] = useState(true);

  return (
    <MinorContext.Provider value={{ minorSwitch, setMinorSwitch }}>
      {children}
    </MinorContext.Provider>
  );
};

export default MinorContextProvider;
