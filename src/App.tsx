import { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { TweetGenerator } from "./components/tweet-generator";

function App() {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <TweetGenerator />
      </div>
    </ThemeProvider>
  );
}

export default App;
