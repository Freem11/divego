import { createContext, useState } from 'react';

export const CommentsModalContext = createContext('');

const CommentsModalContextProvider = ({ children }) => {
  const [commentsModal, setCommentsModal] = useState(false);

  return (
    <CommentsModalContext.Provider value={{ commentsModal, setCommentsModal }}>
      {children}
    </CommentsModalContext.Provider>
  );
};

export default CommentsModalContextProvider;
