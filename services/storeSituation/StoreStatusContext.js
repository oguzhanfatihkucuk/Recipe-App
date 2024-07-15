import React, { createContext, useState, useContext } from 'react';


/*Mağaza durumunu kontrol etmek için kullanılan Context API*/
const StoreStatusContext = createContext();

export const StoreStatusProvider = ({ children }) => {

  /*Mağaza durumunu göstermek için kullanılan bool değer ve bunu kontrol eden Hook fonksiyonu.*/
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  /*Mağaza offline iken yapılan satışların kaç adet olduğunu gösteren int değer ve bunu kontrol eden Hook fonksiyonu.*/
  const [countOfPrinterWork, setCountOfPrinterWork] = useState(0);

  return (
    <StoreStatusContext.Provider value={{ isStoreOpen, setIsStoreOpen ,countOfPrinterWork,setCountOfPrinterWork}}>
      {children}
    </StoreStatusContext.Provider>
  );
};

// Custom hook
export const useStoreStatus = () => useContext(StoreStatusContext);
