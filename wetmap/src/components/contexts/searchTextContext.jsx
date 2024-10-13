import { createContext, useState } from 'react';

export const SearchTextContext = createContext('');

const SearchTextContextProvider = ({ children }) => {
  const [textvalue, setTextValue] = useState('');

  return (
    <SearchTextContext.Provider value={{ textvalue, setTextValue }}>
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
