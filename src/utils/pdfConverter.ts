import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFSettings } from '../types';

const PAGE_SIZES = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
};

export const convertToPDF = async (
  htmlContent: string,
  settings: PDFSettings
): Promise<void> => {
  const tempContainer = document.createElement('div');
  // Set a fixed width to ensure consistent rendering
  tempContainer.style.width = '1000px'; 
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.innerHTML = htmlContent;
  document.body.appendChild(tempContainer);

  try {
    const canvas = await html2canvas(tempContainer, {
      scale: settings.scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Ensure the full content is captured regardless of window size
      windowWidth: tempContainer.scrollWidth,
      windowHeight: tempContainer.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pageSize = PAGE_SIZES[settings.pageSize];
    
    const pdf = new jsPDF({
      orientation: settings.orientation,
      unit: 'mm',
      format: settings.pageSize,
    });

    const pdfWidth = settings.orientation === 'portrait' 
      ? pageSize.width 
      : pageSize.height;
    const pdfHeight = settings.orientation === 'portrait' 
      ? pageSize.height 
      : pageSize.width;

    const margin = settings.margin;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = pdfHeight - margin * 2;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / contentWidth;
    const scaledHeight = canvasHeight / ratio;

    let heightLeft = scaledHeight;
    let yPosition = 0;

    // Add the first page
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, scaledHeight);
    heightLeft -= contentHeight;

    // Add subsequent pages if the content is taller than one page
    while (heightLeft > 0) {
      yPosition -= contentHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, yPosition, contentWidth, scaledHeight);
      heightLeft -= contentHeight;
    }

    const fileName = `dokumen_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } finally {
    document.body.removeChild(tempContainer);
  }
};
