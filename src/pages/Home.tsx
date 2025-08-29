import React, { useState, useCallback } from "react";
import Auth from "@/Auth";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import StepHeader from "@/components/StepHeader";
import FileUploadStep from "@/components/FileUploadStep";
import PlatformStep from "@/components/PlatformStep";
import ElementStep from "@/components/ElementStep";
import ScriptStep from "@/components/ScriptStep";

interface FileUpload {
  name: string;
  size: number;
}

type Platform = "web" | "mobile" | "ar";
type Element = "search" | "ai-agent" | "support-agent";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<FileUpload | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleFileUpload = useCallback((file: File) => {
    setUploadedFile({ name: file.name, size: file.size });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const generateScript = () => {
    const platformCode = {
      web: "window.ragCX.initWebApp",
      mobile: "RagCX.initMobileApp",
      ar: "RagCX.initAR",
    };

    const elementCode = {
      search: "searchBox",
      "ai-agent": "aiAgent",
      "support-agent": "supportAgent",
    };

    return `// RAG.CX Integration Script
// Platform: ${selectedPlatform?.toUpperCase()}
// Element: ${selectedElement?.replace("-", " ").toUpperCase()}

import { RagCX } from '@rag-cx/sdk';

const config = {
  apiKey: 'your-api-key-here',
  document: '${uploadedFile?.name}',
  platform: '${selectedPlatform}',
  element: '${selectedElement}'
};

// Initialize RAG.CX
${platformCode[selectedPlatform!]}({
  ...config,
  element: RagCX.${elementCode[selectedElement!]}
});

// Ready to use!
console.log('RAG.CX initialized successfully');`;
  };

  const copyScript = async () => {
    const script = generateScript();
    await navigator.clipboard.writeText(script);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <Auth
        onAuthSuccess={handleAuthSuccess}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return uploadedFile !== null;
      case 2:
        return selectedPlatform !== null;
      case 3:
        return selectedElement !== null;
      default:
        return false;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-12 px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-[#F9FAFB]"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <StepHeader currentStep={currentStep} isDarkMode={isDarkMode} />
        <div className="relative">
          {/* Step 1: Document Upload */}
          <div
            className={`transition-all duration-500 transform ${
              currentStep === 1
                ? "opacity-100 translate-y-0"
                : currentStep > 1
                ? "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <FileUploadStep
              isDarkMode={isDarkMode}
              isDragging={isDragging}
              uploadedFile={uploadedFile}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              handleFileInput={handleFileInput}
              formatFileSize={formatFileSize}
            />
          </div>
          {/* Step 2: Choose Platform */}
          <div
            className={`transition-all duration-500 transform ${
              currentStep === 2
                ? "opacity-100 translate-y-0"
                : currentStep > 2
                ? "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <PlatformStep
              isDarkMode={isDarkMode}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
          </div>
          {/* Step 3: Choose Element */}
          <div
            className={`transition-all duration-500 transform ${
              currentStep === 3
                ? "opacity-100 translate-y-0"
                : currentStep > 3
                ? "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <ElementStep
              isDarkMode={isDarkMode}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
            />
          </div>
          {/* Step 4: Script Generation */}
          <div
            className={`transition-all duration-500 transform ${
              currentStep === 4
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <ScriptStep
              isDarkMode={isDarkMode}
              selectedPlatform={selectedPlatform}
              selectedElement={selectedElement}
              generateScript={generateScript}
              copyScript={copyScript}
              scriptCopied={scriptCopied}
            />
          </div>
        </div>
        {/* Navigation */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className={`flex items-center space-x-2 px-4 py-2 transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-200 ${
                canProceed()
                  ? "bg-[#A259FF] text-white hover:bg-purple-700 hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        {currentStep === 1 && uploadedFile && (
          <div className="flex justify-end mt-8">
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-2 bg-[#A259FF] text-white rounded-full hover:bg-purple-700 hover:shadow-lg transition-all duration-200"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
