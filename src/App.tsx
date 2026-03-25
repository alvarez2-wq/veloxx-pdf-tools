import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/hooks/useTheme';
import { HomePage } from '@/pages/HomePage';
import { JpgToPdfPage } from '@/pages/JpgToPdfPage';
import { MergePdfPage } from '@/pages/MergePdfPage';
import { PdfToJpgPage } from '@/pages/PdfToJpgPage';
import { CompressPdfPage } from '@/pages/CompressPdfPage';
import { SplitPdfPage } from '@/pages/SplitPdfPage';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
          <Route path="/merge-pdf" element={<MergePdfPage />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
          <Route path="/compress-pdf" element={<CompressPdfPage />} />
          <Route path="/split-pdf" element={<SplitPdfPage />} />
        </Routes>
      </main>
      <Footer theme={theme} />
      <Analytics />
    </div>
  );
}
