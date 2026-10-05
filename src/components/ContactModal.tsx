import React, { useEffect, useState } from 'react';
import { ARTIST_INFO, Artwork } from '../data/artworks';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiredArtwork?: Artwork | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  inquiredArtwork,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappMessage = inquiredArtwork
    ? `Hello, I saw your artwork "${inquiredArtwork.title}" (${inquiredArtwork.category}) on your portfolio and would like to inquire about it.`
    : 'Hello, I came across your art portfolio and would like to inquire about custom Ganesh idols, rangoli, or paintings.';

  const whatsappNumber = ARTIST_INFO.contact.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(ARTIST_INFO.contact.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-lg w-full bg-[#111116] border border-[#272733] rounded-lg p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#aba393] hover:text-[#fdfaf4] focus-visible:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div>
          <div className="text-xs tracking-[0.2em] uppercase font-medium text-[#dfb050] mb-1">
            Connect & Inquire
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#fdfaf4] font-medium">
            Get in Touch
          </h2>
          <p className="text-sm text-[#ded7c8]/80 mt-1">
            Based in Nagpur, Maharashtra. Available for custom handcrafted orders, festive designs, and private inquiries.
          </p>
        </div>

        {inquiredArtwork && (
          <div className="p-3 bg-[#181822] border border-[#272735] rounded text-xs text-[#ded7c8] flex items-center justify-between">
            <div>
              <span className="text-[#aba393]">Inquiring about: </span>
              <span className="font-medium text-[#dfb050]">{inquiredArtwork.title}</span>
            </div>
            <span className="text-[#aba393]">({inquiredArtwork.category})</span>
          </div>
        )}

        {/* Channels */}
        <div className="space-y-3">
          {/* WhatsApp Direct Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-md bg-[#16161f] border border-[#272735] hover:border-[#dfb050]/50 hover:bg-[#1a1a24] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#25D366]/15 text-[#25D366] flex items-center justify-center font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.848.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.77-5.767-5.770zm0 10.354c-.82 0-1.583-.223-2.261-.643l-.162-.097-1.681.441.449-1.639-.107-.17c-.456-.725-.697-1.572-.697-2.48 0-2.533 2.062-4.595 4.459-4.595 2.398 0 4.459 2.062 4.459 4.595 0 2.533-2.061 4.588-4.46 4.588zm2.663-3.414c-.146-.073-.864-.426-.998-.475-.133-.049-.23-.073-.328.073-.098.147-.376.475-.461.573-.085.098-.17.11-.316.037-.146-.073-.617-.228-1.175-.725-.434-.387-.727-.866-.812-1.013-.085-.146-.009-.226.064-.298.066-.065.146-.17.219-.256.073-.085.097-.146.146-.243.049-.098.024-.183-.012-.256-.037-.073-.328-.79-.45-1.082-.119-.285-.24-.246-.328-.251-.085-.005-.183-.005-.28-.005-.098 0-.256.037-.389.183-.134.146-.511.499-.511 1.217s.523 1.412.596 1.51c.073.098 1.029 1.571 2.493 2.203.348.151.62.241.832.308.35.111.668.096.92.058.281-.042.864-.353.986-.694.122-.341.122-.633.085-.694-.037-.061-.134-.098-.28-.171z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-[#fdfaf4] group-hover:text-[#dfb050] transition-colors">
                  WhatsApp
                </div>
                <div className="text-xs text-[#aba393]">Direct chat & quick photo sharing</div>
              </div>
            </div>
            <span className="text-xs text-[#dfb050]">Open →</span>
          </a>

          {/* Instagram Action */}
          <a
            href={ARTIST_INFO.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-md bg-[#16161f] border border-[#272735] hover:border-[#dfb050]/50 hover:bg-[#1a1a24] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#E4405F]/15 text-[#E4405F] flex items-center justify-center font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-[#fdfaf4] group-hover:text-[#dfb050] transition-colors">
                  Instagram
                </div>
                <div className="text-xs text-[#aba393]">{ARTIST_INFO.contact.instagramHandle}</div>
              </div>
            </div>
            <span className="text-xs text-[#dfb050]">View Profile →</span>
          </a>

          {/* Direct Phone / Copy */}
          <div
            onClick={handleCopyPhone}
            className="flex items-center justify-between p-4 rounded-md bg-[#16161f] border border-[#272735] hover:border-[#dfb050]/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#dfb050]/15 text-[#dfb050] flex items-center justify-center font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-[#fdfaf4] group-hover:text-[#dfb050] transition-colors">
                  Phone / Studio Line
                </div>
                <div className="text-xs text-[#aba393]">{ARTIST_INFO.contact.phone}</div>
              </div>
            </div>
            <span className="text-xs text-[#dfb050]">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </div>
        </div>

        {/* Location Note */}
        <div className="pt-2 text-center text-xs text-[#aba393] border-t border-[#1a1a24]">
          <span>Studio located in Nagpur, Maharashtra · Custom commissions welcomed</span>
        </div>
      </div>
    </div>
  );
};
