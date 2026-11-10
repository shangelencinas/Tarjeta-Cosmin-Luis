/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Monitor, Layers, Sparkles } from 'lucide-react';
import { contactData } from './data/contactData';
import { Header } from './components/Header';
import { HeroCard } from './components/HeroCard';
import { CosminSection } from './components/CosminSection';
import { CoslinkSection } from './components/CoslinkSection';
import { LeadContactForm } from './components/LeadContactForm';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { QRCodeModal } from './components/QRCodeModal';
import { WordPressEmbedModal } from './components/WordPressEmbedModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isWPModalOpen, setIsWPModalOpen] = useState(false);

  // Synchronize dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16 sm:pb-0 font-sans selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-300">
      <Header
        contact={contactData}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenWP={() => setIsWPModalOpen(true)}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <HeroCard
          contact={contactData}
          onOpenQR={() => setIsQRModalOpen(true)}
          onOpenWP={() => setIsWPModalOpen(true)}
        />
        <CosminSection contact={contactData} />
        <CoslinkSection contact={contactData} />
        <LeadContactForm contact={contactData} />
      </motion.main>

      <Footer
        contact={contactData}
        onOpenWP={() => setIsWPModalOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      {/* Mobile Bottom Quick-Action Sticky Bar */}
      <MobileQuickBar
        contact={contactData}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      {/* Dynamic QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        contact={contactData}
      />

      {/* WordPress & Elementor Code Export Modal */}
      <WordPressEmbedModal
        isOpen={isWPModalOpen}
        onClose={() => setIsWPModalOpen(false)}
      />
    </div>
  );
}
