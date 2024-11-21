import React, { createContext, useState } from 'react';
import { DiveSiteWithUserName } from '../../entities/diveSite';

type SelectedDiveSiteContextType = {
  selectedDiveSite:    DiveSiteWithUserName
  setSelectedDiveSite: React.Dispatch<React.SetStateAction<DiveSiteWithUserName>>
};

const SelectedDiveSiteContextState = {
  selectedDiveSite:      {
    id:                   0,
    name:                 '',
    lat:                  0,
    lng:                  0,
    photo:                '',
    userid:               '',
    region:               '',
    username:             '',
    created_at:           '',
    divesitebio:          '',
    newusername:          '',
    divesiteprofilephoto: '',

  },
  setSelectedDiveSite: () => {},
};

export const SelectedDiveSiteContext = createContext<SelectedDiveSiteContextType>(
  SelectedDiveSiteContextState,
);

const SelectedDiveSiteContextProvider = ({ children }: any) => {
  const [selectedDiveSite, setSelectedDiveSite] = useState<DiveSiteWithUserName>({
    id:                   0,
    name:                 '',
    lat:                  0,
    lng:                  0,
    photo:                '',
    userid:               '',
    region:               '',
    username:             '',
    created_at:           '',
    divesitebio:          '',
    newusername:          '',
    divesiteprofilephoto: '',
  });

  return (
    <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
      {children}
    </SelectedDiveSiteContext.Provider>
  );
};

export default SelectedDiveSiteContextProvider;
