import "./App.css";
import { ThemeButton } from "./components/inputs/themeBtn";
import { ThemeProvider } from "./components/providers/themeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeButton />
      </ThemeProvider>
    </>
  );
}

export default App;
