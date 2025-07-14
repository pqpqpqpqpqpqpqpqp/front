import { createContext, useContext, useState } from 'react';

const WriteContext = createContext();

export const WriteProvider = ({ children }) => {
  const [writeOpen, setWriteOpen] = useState(false);

  const openWrite = () => setWriteOpen(true);
  const closeWrite = () => setWriteOpen(false);

  return (
    <WriteContext.Provider value={{ writeOpen, openWrite, closeWrite }}>
      {children}
    </WriteContext.Provider>
  );
};

export const useWrite = () => useContext(WriteContext);