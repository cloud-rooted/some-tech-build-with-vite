import React from "react";
import { FileText, Upload } from "lucide-react";

interface FileUploadProps {
  isDarkMode: boolean;
  isDragging: boolean;
  uploadedFile: { name: string; size: number } | null;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatFileSize: (bytes: number) => string;
}

const FileUploadStep: React.FC<FileUploadProps> = ({
  isDarkMode,
  isDragging,
  uploadedFile,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileInput,
  formatFileSize,
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
      Upload Your Document
    </h2>
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragging
          ? "border-[#A259FF]" +
            (isDarkMode ? " bg-purple-900/20" : " bg-purple-50")
          : isDarkMode
          ? "border-gray-600 hover:border-[#A259FF] hover:bg-gray-700/50"
          : "border-gray-300 hover:border-[#A259FF] hover:bg-gray-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FileText
        className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
          isDarkMode ? "text-gray-500" : "text-gray-400"
        }`}
      />
      <p
        className={`mb-4 transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {isDragging
          ? "Drop your file here"
          : "Drag and drop your document here"}
      </p>
      <label className="inline-block">
        <input
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.txt"
        />
        <span className="bg-[#A259FF] text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors cursor-pointer inline-flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Browse File</span>
        </span>
      </label>
    </div>
    {uploadedFile && (
      <div
        className={`mt-6 p-4 rounded-lg border transition-colors duration-300 ${
          isDarkMode
            ? "bg-green-900/20 border-green-800"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="flex items-center space-x-3">
          <FileText
            className={`w-5 h-5 transition-colors duration-300 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <div>
            <p
              className={`font-medium transition-colors duration-300 ${
                isDarkMode ? "text-green-300" : "text-green-800"
              }`}
            >
              {uploadedFile.name}
            </p>
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default FileUploadStep;
