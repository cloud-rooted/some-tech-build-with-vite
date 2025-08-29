import React from "react";
import { Search, Bot, Headphones } from "lucide-react";

interface ElementStepProps {
  isDarkMode: boolean;
  selectedElement: "search" | "ai-agent" | "support-agent" | null;
  setSelectedElement: (
    element: "search" | "ai-agent" | "support-agent"
  ) => void;
}

const elements = [
  { id: "search" as const, icon: Search, label: "Search Box" },
  { id: "ai-agent" as const, icon: Bot, label: "AI Agent" },
  { id: "support-agent" as const, icon: Headphones, label: "Support Agent" },
];

const ElementStep: React.FC<ElementStepProps> = ({
  isDarkMode,
  selectedElement,
  setSelectedElement,
}) => (
  <div
    className={`rounded-2xl shadow-md p-8 transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h2
      className={`text-2xl font-semibold text-center mb-8 transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-[#111827]"
      }`}
    >
      Select an Element
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {elements.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setSelectedElement(id)}
          className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
            selectedElement === id
              ? "bg-[#A259FF] border-[#A259FF] text-white"
              : isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-[#A259FF]"
              : "bg-white border-gray-200 text-gray-700 hover:border-[#A259FF]"
          }`}
        >
          <Icon className="w-8 h-8 mx-auto mb-3" />
          <p className="font-medium">{label}</p>
        </button>
      ))}
    </div>
  </div>
);

export default ElementStep;
