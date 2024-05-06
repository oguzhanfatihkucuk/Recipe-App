import { Context, createContext } from 'react';

type DarkModeContextValue = {
  isDarkMode: boolean;
  setIsDarkMode: (prev: boolean) => void;
};

const DarkMode: Context<DarkModeContextValue> =
  createContext<DarkModeContextValue>({
    isDarkMode: false,
    setIsDarkMode: () => {},
  });

export default DarkMode;
