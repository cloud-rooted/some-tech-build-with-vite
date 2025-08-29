import React from "react";
import { Check } from "lucide-react";

interface StepHeaderProps {
  currentStep: number;
  isDarkMode: boolean;
}

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, isDarkMode }) => (
  <div className="text-center mb-12">
    <h1
      className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-[#111827]"
      }`}
    >
      Welcome to RAG.CX
    </h1>
    <div
      className={`flex justify-center items-center space-x-2 text-sm transition-colors duration-300 ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
              step === currentStep
                ? "bg-[#A259FF] text-white"
                : step < currentStep
                ? "bg-green-500 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-500"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {step < currentStep ? <Check className="w-4 h-4" /> : step}
          </div>
          {step < 4 && (
            <div
              className={`w-8 h-0.5 transition-colors duration-300 ${
                step < currentStep
                  ? "bg-green-500"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default StepHeader;
