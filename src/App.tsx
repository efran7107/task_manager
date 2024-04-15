import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { LogIn } from "./components/log-in";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1>Task Manager</h1>
        <ModeToggle />
        <LogIn />
      </ThemeProvider>
    </>
  );
}

export default App;
