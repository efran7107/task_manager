import { createContext, useContext } from "react";
import { ThemeProviderState } from "../types/themeTypes";
import { TLogInProvider } from "../types/logInProviderTypes";
import { TUserProvider } from "../types/userProviderTypes";

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

export const LogInProviderContext = createContext<TLogInProvider>(
  {} as TLogInProvider
);
export const useLogIn = () => useContext(LogInProviderContext);

export const UserProviderContext = createContext<TUserProvider>(
  {} as TUserProvider
);
export const useUser = () => useContext(UserProviderContext)
