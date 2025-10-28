import React from 'react';
import { Code2, Copy, RotateCcw } from 'lucide-react';

interface EditorPanelProps {
  htmlContent: string;
  onContentChange: (content: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ htmlContent, onContentChange }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengatur ulang konten HTML?')) {
      onContentChange(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dokumen</title>
</head>
<body>
  <h1>Konten Anda di Sini</h1>
</body>
</html>`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <Code2 className="w-5 h-5 text-white" />
          <h2 className="text-base lg:text-lg font-semibold text-white">Editor HTML</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Salin HTML"
          >
            <Copy className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Atur Ulang HTML"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4 lg:p-6">
        <textarea
          value={htmlContent}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-64 lg:h-96 font-mono text-xs lg:text-sm bg-gray-50 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Masukkan kode HTML Anda di sini..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
