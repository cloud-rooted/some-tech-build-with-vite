import React, { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

interface ScriptStepProps {
  isDarkMode: boolean;
  selectedPlatform: string | null;
  selectedElement: string | null;
  generateScript: () => string;
  copyScript: () => void;
  scriptCopied: boolean;
}

// Vite ?raw import for embeddable scripts (static import)
import searchScript from "../elementscript/search.js?raw";
import agentScript from "../elementscript/agent.js?raw";
import supportScript from "../elementscript/support.js?raw";

const ScriptStep: React.FC<ScriptStepProps> = ({
  isDarkMode,
  selectedPlatform,
  selectedElement,
  generateScript,
  copyScript,
  scriptCopied,
}) => {
  const [embedScript, setEmbedScript] = useState<string>("");

  useEffect(() => {
    let script = "";
    if (selectedElement === "search") script = searchScript;
    else if (selectedElement === "ai-agent") script = agentScript;
    else if (selectedElement === "support-agent") script = supportScript;
    setEmbedScript(script);
  }, [selectedElement]);

  return (
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
        Generated Script
      </h2>
      <div className="relative">
        {selectedElement && embedScript ? (
          <pre
            className={`w-full h-80 p-4 font-mono text-sm border rounded-xl resize-none focus:outline-none transition-colors duration-300 overflow-auto ${
              isDarkMode
                ? "bg-gray-900 border-gray-600 text-gray-300"
                : "bg-gray-50 border-gray-200 text-gray-900"
            }`}
          >
            {`<script>\n${embedScript}\n</script>`}
          </pre>
        ) : (
          <textarea
            value={selectedPlatform && selectedElement ? generateScript() : ""}
            readOnly
            className={`w-full h-80 p-4 font-mono text-sm border rounded-xl resize-none focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900 border-gray-600 text-gray-300"
                : "bg-gray-50 border-gray-200 text-gray-900"
            }`}
          />
        )}
        <button
          onClick={copyScript}
          className="absolute top-4 right-4 bg-[#A259FF] text-white p-2 rounded-lg hover:bg-purple-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
        >
          {scriptCopied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-sm">
            {scriptCopied ? "Copied!" : "Copy Script"}
          </span>
        </button>
      </div>
      {scriptCopied && (
        <div
          className={`mt-4 p-3 border rounded-lg text-sm text-center transition-colors duration-300 ${
            isDarkMode
              ? "bg-green-900/20 border-green-800 text-green-300"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          ✅ Script copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ScriptStep;
