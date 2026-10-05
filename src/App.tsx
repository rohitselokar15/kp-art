import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ArtworkGallery } from './components/ArtworkGallery';
import { AboutSection } from './components/AboutSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { CategoryPage } from './components/CategoryPage';
import { ArtworkLightbox } from './components/ArtworkLightbox';
import { ContactModal } from './components/ContactModal';
import { Chatbot } from './components/Chatbot';
import { Artwork } from './data/artworks';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [inquiredArtwork, setInquiredArtwork] = useState<Artwork | null>(null);

  // Sync hash with view if user presses back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['ganesh-idols', 'rangoli', 'paintings', 'about'].includes(hash)) {
        setCurrentView(hash);
      } else if (!hash || hash === 'home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'home') {
      window.history.pushState(null, '', '#');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', `#${view}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const el = document.getElementById('featured-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavigate('home');
    }
  };

  const handleOpenContact = (artwork?: Artwork | null) => {
    setInquiredArtwork(artwork || null);
    setIsContactOpen(true);
  };

  const handleLightboxInquire = (artwork: Artwork) => {
    setSelectedArtwork(null);
    handleOpenContact(artwork);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-[#f4eee3] selection:bg-[#c99738]/30 selection:text-[#fbf7ee]">
      {/* 3-Zone Minimalist Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onExploreWork={handleExploreWork}
              onOpenContact={() => handleOpenContact(null)}
            />

            {/* 2. What I Create (3 Main Disciplines) */}
            <CategorySection onSelectCategory={handleNavigate} />

            {/* 3. Featured Work (Visual Editorial Gallery) */}
            <ArtworkGallery onArtworkClick={(art) => setSelectedArtwork(art)} />

            {/* 4. Special About Section */}
            <AboutSection onOpenContact={() => handleOpenContact(null)} />

            {/* 5. Final CTA Section */}
            <CTASection onOpenContact={() => handleOpenContact(null)} />
          </>
        )}

        {(currentView === 'ganesh-idols' ||
          currentView === 'rangoli' ||
          currentView === 'paintings') && (
          <CategoryPage
            categorySlug={currentView as 'ganesh-idols' | 'rangoli' | 'paintings'}
            onBackToHome={() => handleNavigate('home')}
            onArtworkClick={(art) => setSelectedArtwork(art)}
            onOpenContact={() => handleOpenContact(null)}
          />
        )}

        {currentView === 'about' && (
          <div className="pt-8">
            <AboutSection onOpenContact={() => handleOpenContact(null)} />
            <CTASection onOpenContact={() => handleOpenContact(null)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact(null)}
      />

      {/* High-Resolution Artwork Lightbox */}
      <ArtworkLightbox
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onInquire={handleLightboxInquire}
      />

      {/* Contact & Inquire Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          setInquiredArtwork(null);
        }}
        inquiredArtwork={inquiredArtwork}
      />

      <Chatbot onOpenContact={() => handleOpenContact(null)} />
    </div>
  );
}
