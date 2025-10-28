export interface PDFSettings {
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  margin: number;
  scale: number;
}

export interface PageSize {
  width: number;
  height: number;
}
