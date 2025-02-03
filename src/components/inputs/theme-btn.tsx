import { useTheme } from "../../functions/providersContext";
import "../../css/theme-btn.css";
export const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div
      className="theme-button"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? (
        <i className="fa-regular fa-moon"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </div>
  );
};
