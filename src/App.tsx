import "./App.css";
import { ThemeButton } from "./components/inputs/themeBtn";
import { ThemeProvider } from "./components/providers/themeProvider";
import { UserProvider } from "./components/providers/userProvider";
import { TaskManager } from "./components/taskManager";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeButton />
        <h1 className="site-title">Task Manager</h1>
        <UserProvider>
          <TaskManager />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
