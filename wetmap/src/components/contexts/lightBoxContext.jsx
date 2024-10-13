import { createContext, useState } from 'react';

export const LightBoxContext = createContext('');

const LightBoxContextProvider = ({ children }) => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <LightBoxContext.Provider value={{ lightbox, setLightbox }}>
      {children}
    </LightBoxContext.Provider>
  );
};

export default LightBoxContextProvider;
