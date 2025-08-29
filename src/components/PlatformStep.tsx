import React from "react";
import { Globe, Smartphone, Glasses } from "lucide-react";

interface PlatformStepProps {
  isDarkMode: boolean;
  selectedPlatform: "web" | "mobile" | "ar" | null;
  setSelectedPlatform: (platform: "web" | "mobile" | "ar") => void;
}

const platforms = [
  { id: "web" as const, icon: Globe, label: "Web App" },
  {
    id: "mobile" as const,
    icon: Smartphone,
    label: "Mobile App",
    comingSoon: true,
  },
  { id: "ar" as const, icon: Glasses, label: "AR", comingSoon: true },
];

const PlatformStep: React.FC<PlatformStepProps> = ({
  isDarkMode,
  selectedPlatform,
  setSelectedPlatform,
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
      Select Your Platform
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {platforms.map(({ id, icon: Icon, label, comingSoon }) => (
        <button
          key={id}
          onClick={() => setSelectedPlatform(id)}
          disabled={comingSoon}
          className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
            comingSoon ? "cursor-not-allowed opacity-60" : "hover:scale-105"
          } ${
            selectedPlatform === id
              ? "bg-[#A259FF] border-[#A259FF] text-white"
              : comingSoon
              ? isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-500"
                : "bg-gray-100 border-gray-300 text-gray-400"
              : isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-[#A259FF]"
              : "bg-white border-gray-200 text-gray-700 hover:border-[#A259FF]"
          }`}
        >
          <Icon className="w-8 h-8 mx-auto mb-3" />
          <p className="font-medium">{label}</p>
          {comingSoon && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
              Coming Soon
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default PlatformStep;
