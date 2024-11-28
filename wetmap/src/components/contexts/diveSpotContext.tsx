import React, { createContext, useState } from 'react';
import { DiveSiteSubmissionData } from '../../entities/diveSiteSubmission';

type DiveSpotContextType = {
  addSiteVals:    DiveSiteSubmissionData
  setAddSiteVals: React.Dispatch<React.SetStateAction<DiveSiteSubmissionData>>
};

const DiveSpotContextState = {
  addSiteVals:      {
    Site:      '',
    Latitude:  0,
    Longitude: 0,
    UserID:    '',

  },
  setAddSiteVals: () => {},
};

export const DiveSpotContext = createContext<DiveSpotContextType>(
  DiveSpotContextState,
);

const DiveSpotContextProvider = ({ children }: any) => {
  const [addSiteVals, setAddSiteVals] = useState({
    Site:      '',
    Latitude:  0,
    Longitude: 0,
    UserID:    '',
  });

  return (
    <DiveSpotContext.Provider value={{ addSiteVals, setAddSiteVals }}>
      {children}
    </DiveSpotContext.Provider>
  );
};

export default DiveSpotContextProvider;
