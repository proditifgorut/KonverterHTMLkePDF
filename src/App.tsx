import React, { useState } from 'react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import SettingsPanel from './components/SettingsPanel';
import { PDFSettings } from './types';

function App() {
  const [htmlContent, setHtmlContent] = useState<string>(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contoh Dokumen</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #2563eb;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 10px;
    }
    h2 {
      color: #1e40af;
      margin-top: 30px;
    }
    p {
      margin-bottom: 15px;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 2px 5px;
      border-radius: 3px;
    }
    ul {
      margin-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <h1>Selamat Datang di Konverter HTML ke PDF</h1>
  
  <p>Ini adalah <span class="highlight">contoh dokumen HTML</span> yang menunjukkan kemampuan konversi dari alat kami.</p>
  
  <h2>Fitur Utama</h2>
  <ul>
    <li>Pratinjau langsung konten HTML Anda</li>
    <li>Pengaturan PDF yang dapat disesuaikan</li>
    <li>Beberapa pilihan ukuran halaman</li>
    <li>Orientasi potret dan lanskap</li>
    <li>Antarmuka yang mudah digunakan</li>
  </ul>
  
  <h2>Cara Menggunakan</h2>
  <p>Cukup edit kode HTML di panel editor, lihat pratinjau perubahan Anda secara real-time, sesuaikan pengaturan PDF sesuai kebutuhan, dan klik tombol <strong>Konversi ke PDF</strong> untuk mengunduh dokumen Anda.</p>
  
  <p>Anda dapat menyesuaikan semuanya mulai dari font hingga warna, menambahkan gambar, membuat tabel, dan banyak lagi!</p>
</body>
</html>`);

  const [settings, setSettings] = useState<PDFSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 10,
    scale: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <EditorPanel 
              htmlContent={htmlContent}
              onContentChange={setHtmlContent}
            />
            
            <PreviewPanel 
              htmlContent={htmlContent}
              settings={settings}
            />
          </div>
          
          <div className="lg:col-span-1">
            <SettingsPanel 
              settings={settings}
              onSettingsChange={setSettings}
              htmlContent={htmlContent}
            />
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 Konverter HTML ke PDF. Dibuat dengan React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
