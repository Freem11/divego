import { createContext, useState } from 'react';

export const DiveSitesContext = createContext('');

const DiveSitesContextProvider = ({ children }) => {
  const [divesTog, setDivesTog] = useState(true);

  return (
    <DiveSitesContext.Provider value={{ divesTog, setDivesTog }}>
      {children}
    </DiveSitesContext.Provider>
  );
};

export default DiveSitesContextProvider;
