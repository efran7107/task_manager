export type Theme = "dark" | "light" | "system";

export type Page = "login/signup" | "loading" | "dashboard" | "add-task";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type TUserProvider = {
  page: Page;
  setPage: (page: Page) => void;
};

export type TLogInProvider = {};
