import "./App.css";
import { ThemeProvider } from "@/components/componentsProvider/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { UserProvider } from "./components/componentsProvider/UserProvider";
import { Toaster } from "react-hot-toast";
import { TaskManager } from "./components/TaskManager";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <h1>Task Manager</h1>
        <ModeToggle />
        <UserProvider>
          <TaskManager />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
