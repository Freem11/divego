import React, { createContext, useState } from 'react';

type EditModeContextType = {
  isEditModeOn:    boolean
  setIsEditModeOn: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditModeContext = createContext<EditModeContextType>({} as EditModeContextType);

const EditModeContextProvider = ({ children }: any) => {
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);

  return (
    <EditModeContext.Provider value={{ isEditModeOn, setIsEditModeOn }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContextProvider;
