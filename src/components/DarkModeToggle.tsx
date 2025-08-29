import React from "react";
import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => (
  <div className="flex justify-end mb-6">
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
        isDarkMode
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
      }`}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </div>
);

export default DarkModeToggle;
