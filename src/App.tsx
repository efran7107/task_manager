import { Toaster } from "react-hot-toast";
import "./App.css";
import { ThemeButton } from "./components/inputs/themeBtn";
import { ThemeProvider } from "./components/providers/themeProvider";
import { UserProvider } from "./components/providers/userProvider";
import { TaskManager } from "./components/taskManager";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster
          toastOptions={{
            success: {
              className: "success-note",
            },
            error: {
              className: "error-note",
            },
          }}
        />
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
