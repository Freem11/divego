import { createContext, useState } from 'react';

export const JumpContext = createContext('');

const JumpContextProvider = ({ children }) => {
  const [jump, setJump] = useState(false);

  return (
    <JumpContext.Provider value={{ jump, setJump }}>
      {children}
    </JumpContext.Provider>
  );
};

export default JumpContextProvider;
