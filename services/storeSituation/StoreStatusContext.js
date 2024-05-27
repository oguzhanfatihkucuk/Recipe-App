import React, { createContext, useState, useContext } from 'react';

const StoreStatusContext = createContext();

export const StoreStatusProvider = ({ children }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  return (
    <StoreStatusContext.Provider value={{ isStoreOpen, setIsStoreOpen }}>
      {children}
    </StoreStatusContext.Provider>
  );
};

// Custom hook
export const useStoreStatus = () => useContext(StoreStatusContext);
