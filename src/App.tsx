import "./App.css";
import { ThemeProvider } from "@/components/componentsProvider/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { LogIn } from "./components/log-in";
import { UserProvider } from "./components/componentsProvider/UserProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1>Task Manager</h1>
        <ModeToggle />
        <UserProvider>
          <LogIn />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
