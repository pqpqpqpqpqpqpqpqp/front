// WriteContext.js
import { createContext, useContext, useState } from 'react';

const WriteContext = createContext();

export const WriteProvider = ({ children }) => {
  const [writeOpen, setWriteOpen] = useState(false);
  const [initialContent, setInitialContent] = useState('');
  const [parentIdx, setParentIdx] = useState(null);

  const openWrite = (content = "", parent = null) => {
    setInitialContent(content);
    setParentIdx(parent);
    setWriteOpen(true);
  };

  const closeWrite = () => {
    setWriteOpen(false);
    setInitialContent('');
    setParentIdx(null);
  };

  return (
    <WriteContext.Provider value={{
      writeOpen,
      initialContent,
      parentIdx,
      openWrite,
      closeWrite
    }}>
      {children}
    </WriteContext.Provider>
  );
};

export const useWrite = () => useContext(WriteContext);