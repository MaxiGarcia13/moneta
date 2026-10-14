import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export interface PdfTextItem {
  str: string;
  x: number;
  y: number;
  page: number;
}

export async function extractPdfTextItems(file: File): Promise<PdfTextItem[]> {
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;
  const items: PdfTextItem[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      for (const item of content.items) {
        if (!('str' in item) || !item.str.trim()) {
          continue;
        }

        items.push({
          str: item.str,
          x: item.transform[4],
          y: item.transform[5],
          page: pageNumber,
        });
      }
    }
  } finally {
    await loadingTask.destroy();
  }

  return items;
}
