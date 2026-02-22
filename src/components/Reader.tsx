import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Home as HomeIcon, Download } from 'lucide-react';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface ReaderProps {
  paraNum: number;
  onBack: () => void;
  onNextPara: () => void;
}

export default function Reader({ paraNum, onBack, onNextPara }: ReaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);

  // Format para number for filename (e.g., 1 -> 01)
  const formattedNum = paraNum < 10 ? `0${paraNum}` : paraNum;
  const pdfUrl = `/quran_pdf/Chapter${formattedNum}.pdf`;

  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setPageCount(doc.numPages);
        setPageNum(1);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(`File nahi mili! Check karein ki folder 'quran_pdf' ke andar Chapter${formattedNum}.pdf maujood hai.`);
        setLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl, formattedNum]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      setRendering(true);
      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        // Adjust scale based on screen width
        const scale = window.innerWidth < 600 ? 0.9 : 1.3;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
      } finally {
        setRendering(false);
      }
    };

    renderPage();
    window.scrollTo(0, 0);
  }, [pdfDoc, pageNum]);

  const handlePrev = () => {
    if (pageNum > 1 && !rendering) {
      setPageNum(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (rendering) return;
    
    if (pageNum < pageCount) {
      setPageNum(prev => prev + 1);
    } else if (paraNum < 30) {
      // If on last page and not last para, go to next para
      onNextPara();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-amiri">
      <header className="sticky top-0 z-50 bg-black/90 border-b-2 border-gold p-4 flex items-center justify-between shadow-md">
        <button 
          onClick={onBack}
          className="bg-gold text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors shadow-sm"
        >
          <HomeIcon size={18} /> Home
        </button>
        <div className="text-gold text-xl font-bold">Reading Para {paraNum}</div>
        <div className="w-[88px]"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex-1 flex flex-col items-center p-4">
        {loading && (
          <div className="text-gold text-xl font-bold mt-10 animate-pulse">
            Sabr Karein, Para Load Ho Raha Hai...
          </div>
        )}

        {error && (
          <div className="text-red-600 text-lg font-bold mt-10 text-center max-w-md bg-red-100 p-4 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center gap-4 my-4 bg-gray-100 p-2 rounded-full shadow-inner">
              <button 
                onClick={handlePrev}
                disabled={pageNum <= 1 || rendering}
                className="bg-gold text-black p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
              >
                <ChevronLeft />
              </button>
              <span className="text-lg font-bold min-w-[100px] text-center">
                Page: {pageNum} / {pageCount}
              </span>
              <button 
                onClick={handleNext}
                disabled={rendering || (pageNum >= pageCount && paraNum >= 30)}
                className="bg-gold text-black p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors flex items-center gap-1 px-4"
              >
                {pageNum >= pageCount && paraNum < 30 ? (
                  <span className="text-sm font-bold">Next Para</span>
                ) : null}
                <ChevronRight />
              </button>
            </div>

            <canvas 
              ref={canvasRef} 
              className="border-[3px] border-gold shadow-lg max-w-full bg-white"
            />

            <div className="mt-8 mb-4">
              <a 
                href={pdfUrl} 
                download 
                className="bg-gold text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors shadow-md"
              >
                <Download size={20} /> Is Para Ko Download Karein
              </a>
            </div>
          </>
        )}
      </main>

      <footer className="bg-black/90 text-gold font-bold tracking-widest uppercase p-6 text-center border-t border-gold/30">
        ✨ MADE BY SAM ✨
      </footer>
    </div>
  );
}
