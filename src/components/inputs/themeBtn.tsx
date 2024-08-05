import { useTheme } from "../../functions/providersContext";
import "../../index.css";

export const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <a
      className="theme-button"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      Theme
    </a>
  );
};
