import React, { createContext, useState } from 'react';

type SearchTextContextType = {
  textvalue:    string
  setTextValue: React.Dispatch<React.SetStateAction<string>>
};

const SearchTextContextState = {
  textvalue:     '',
  setTextValue: () => {},
};

export const SearchTextContext = createContext<SearchTextContextType>(
  SearchTextContextState,
);

const SearchTextContextProvider = ({ children }: any) => {
  const [textvalue, setTextValue] = useState('');

  return (
    <SearchTextContext.Provider value={{ textvalue, setTextValue }}>
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
