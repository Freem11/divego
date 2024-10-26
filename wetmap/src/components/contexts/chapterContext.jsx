import { createContext, useState } from 'react';

export const ChapterContext = createContext('');

const ChapterContextProvider = ({ children }) => {
  const [chapter, setChapter] = useState(null);

  return (
    <ChapterContext.Provider value={{ chapter, setChapter }}>
      {children}
    </ChapterContext.Provider>
  );
};

export default ChapterContextProvider;
