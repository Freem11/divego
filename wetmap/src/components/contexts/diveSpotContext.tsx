import React, { createContext, useState } from 'react';
import { DiveSiteSubmissionData } from '../../entities/diveSiteSubmission';

type DiveSpotContextType = {
  addSiteVals:    DiveSiteSubmissionData | null
  setAddSiteVals: React.Dispatch<React.SetStateAction<DiveSiteSubmissionData | null>>
};

const DiveSpotContextState = {
  addSiteVals:    null,
  setAddSiteVals: () => {},
};

export const DiveSpotContext = createContext<DiveSpotContextType>(
  DiveSpotContextState,
);

const DiveSpotContextProvider = ({ children }: any) => {
  const [addSiteVals, setAddSiteVals] = useState<DiveSiteSubmissionData | null>(null);

  return (
    <DiveSpotContext.Provider value={{ addSiteVals, setAddSiteVals }}>
      {children}
    </DiveSpotContext.Provider>
  );
};

export default DiveSpotContextProvider;
