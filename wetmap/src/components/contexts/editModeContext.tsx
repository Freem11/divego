import React, { createContext, useState } from 'react';

type EditModeContextType = {
  editMode:    boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditModeContext = createContext<EditModeContextType>({} as EditModeContextType,
);
const EditModeContextProvider = ({ children }: any) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContextProvider;
