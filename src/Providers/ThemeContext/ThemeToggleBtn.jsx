import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggleBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 m-1 rounded-lg bg-[#F2F4F7] dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggleBtn;

// bg-light= #F2F4F7
//bg-card-light = #FFFFFF
// heading-text = #050505
// body-text-light = #606770

//bg-dark = #1C1C1D
// bg-card-dark = #242526 , body-text-dark = #E4E6EB
