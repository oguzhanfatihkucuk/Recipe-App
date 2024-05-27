import React, { createContext, useState, useContext } from 'react';

const StoreStatusContext = createContext();

export const StoreStatusProvider = ({ children }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [countOfPrinterWork, setCountOfPrinterWork] = useState(0);

  return (
    <StoreStatusContext.Provider value={{ isStoreOpen, setIsStoreOpen ,countOfPrinterWork,setCountOfPrinterWork}}>
      {children}
    </StoreStatusContext.Provider>
  );
};

// Custom hook
export const useStoreStatus = () => useContext(StoreStatusContext);
