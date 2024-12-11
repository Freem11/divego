import React, { createContext, useState } from 'react';
import { DiveSiteSubmissionData } from '../../entities/diveSiteSubmission';

type DiveSpotContextType = {
  addSiteVals:    DiveSiteSubmissionData | null
  setAddSiteVals: React.Dispatch<React.SetStateAction<DiveSiteSubmissionData | null>>
};

export const DiveSpotContext = createContext<DiveSpotContextType>({} as DiveSpotContextType);

const DiveSpotContextProvider = ({ children }: any) => {
  const [addSiteVals, setAddSiteVals] = useState<DiveSiteSubmissionData | null>(null);

  return (
    <DiveSpotContext.Provider value={{ addSiteVals, setAddSiteVals }}>
      {children}
    </DiveSpotContext.Provider>
  );
};

export default DiveSpotContextProvider;
