import React, { useRef } from 'react';
import { Eye, Maximize2 } from 'lucide-react';
import { PDFSettings } from '../types';

interface PreviewPanelProps {
  htmlContent: string;
  settings: PDFSettings;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent]);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <Eye className="w-5 h-5 text-white" />
          <h2 className="text-base lg:text-lg font-semibold text-white">Pratinjau Langsung</h2>
        </div>
        <button
          onClick={handleFullscreen}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          title="Layar Penuh"
        >
          <Maximize2 className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <div className="p-4 lg:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-inner overflow-hidden border-2 border-gray-200">
          <iframe
            ref={iframeRef}
            title="Pratinjau HTML"
            className="w-full h-64 lg:h-96 border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
