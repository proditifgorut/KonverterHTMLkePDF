import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 lg:p-3 rounded-xl shadow-lg">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Konverter HTML ke PDF
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              Ubah halaman web Anda menjadi dokumen PDF profesional
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
