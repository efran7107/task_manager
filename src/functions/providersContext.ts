import { createContext, useContext } from "react";
import {
  ThemeProviderState,
  TLogInProvider,
  TUserProvider,
} from "../types/themeTypes";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export const UserProviderContext = createContext<TUserProvider>(
  {} as TUserProvider
);

export const useUser = () => useContext(UserProviderContext);

export const LogInProviderContext = createContext<TLogInProvider>(
  {} as TLogInProvider
);

export const useLogIn = () => useContext(LogInProviderContext);
