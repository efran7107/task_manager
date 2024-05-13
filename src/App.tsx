import "./App.css";
import { ThemeProvider } from "@/components/componentsProvider/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { UserProvider } from "./components/componentsProvider/UserProvider";
import { Toaster } from "react-hot-toast";
import { TaskManager } from "./components/TaskManager";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <div id="header" className="header-container">
          <h1 className="main-header">Task Manager</h1>
        </div>
        <ModeToggle />
        <UserProvider>
          <TaskManager />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
