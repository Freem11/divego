import React, { createContext, useState } from 'react';

type SearchTextContextType = {
  textvalue:    string
  setTextValue: React.Dispatch<React.SetStateAction<string>>
};

export const SearchTextContext = createContext<SearchTextContextType>({} as SearchTextContextType
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
