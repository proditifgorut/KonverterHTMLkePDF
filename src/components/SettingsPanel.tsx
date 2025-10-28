import React, { useState } from 'react';
import { Settings, Download, Loader2 } from 'lucide-react';
import { PDFSettings } from '../types';
import { convertToPDF } from '../utils/pdfConverter';

interface SettingsPanelProps {
  settings: PDFSettings;
  onSettingsChange: (settings: PDFSettings) => void;
  htmlContent: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  settings, 
  onSettingsChange,
  htmlContent 
}) => {
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      await convertToPDF(htmlContent, settings);
    } catch (error) {
      console.error('Gagal mengonversi PDF:', error);
      alert('Gagal mengonversi HTML ke PDF. Silakan coba lagi.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit sticky top-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <Settings className="w-5 h-5 text-white" />
          <h2 className="text-base lg:text-lg font-semibold text-white">Pengaturan PDF</h2>
        </div>
      </div>
      
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ukuran Halaman
          </label>
          <select
            value={settings.pageSize}
            onChange={(e) => onSettingsChange({ 
              ...settings, 
              pageSize: e.target.value as PDFSettings['pageSize'] 
            })}
            className="w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base"
          >
            <option value="a4">A4 (210 × 297 mm)</option>
            <option value="letter">Letter (8.5 × 11 in)</option>
            <option value="legal">Legal (8.5 × 14 in)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orientasi
          </label>
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            <button
              onClick={() => onSettingsChange({ ...settings, orientation: 'portrait' })}
              className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg border-2 transition-all text-sm lg:text-base font-medium ${
                settings.orientation === 'portrait'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Potret
            </button>
            <button
              onClick={() => onSettingsChange({ ...settings, orientation: 'landscape' })}
              className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg border-2 transition-all text-sm lg:text-base font-medium ${
                settings.orientation === 'landscape'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Lanskap
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Margin (mm): {settings.margin}
          </label>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={settings.margin}
            onChange={(e) => onSettingsChange({ 
              ...settings, 
              margin: parseInt(e.target.value) 
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skala: {settings.scale.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.scale}
            onChange={(e) => onSettingsChange({ 
              ...settings, 
              scale: parseFloat(e.target.value) 
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 lg:py-3.5 px-4 lg:px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
        >
          {isConverting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengonversi...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Konversi ke PDF
            </>
          )}
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4">
          <h3 className="text-xs lg:text-sm font-semibold text-blue-900 mb-2">Kiat:</h3>
          <ul className="text-xs lg:text-sm text-blue-800 space-y-1">
            <li>• Gunakan CSS inline untuk hasil terbaik</li>
            <li>• Uji pratinjau sebelum mengonversi</li>
            <li>• Sesuaikan skala untuk konten besar</li>
            <li>• Tambahkan margin untuk spasi lebih baik</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
