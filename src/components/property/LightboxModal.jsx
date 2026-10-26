import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipe } from '../../hooks/useSwipe';

export default function LightboxModal({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onSelectIndex,
  onNext,
  onPrev,
  propertyTitle = 'Residence'
}) {
  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Touch gesture controls
  const swipeHandlers = useSwipe(onNext, onPrev);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Architectural photography gallery for ${propertyTitle}`}
    >
      {/* Top Bar */}
      <div className="lightbox-topbar">
        <div>
          <span className="lightbox-counter">
            Photograph {currentIndex + 1} of {images.length}
          </span>
          <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {propertyTitle}
          </span>
        </div>
        <button onClick={onClose} className="lightbox-close-btn" aria-label="Close Lightbox">
          <X size={18} />
        </button>
      </div>

      {/* Main Stage with Touch handlers */}
      <div className="lightbox-main-stage" {...swipeHandlers}>
        <button
          onClick={onPrev}
          className="lightbox-nav-btn lightbox-prev"
          aria-label="Previous photograph"
        >
          <ChevronLeft size={24} />
        </button>

        <img
          src={images[currentIndex]}
          alt={`${propertyTitle} - Photograph ${currentIndex + 1}`}
          className="lightbox-active-img"
        />

        <button
          onClick={onNext}
          className="lightbox-nav-btn lightbox-next"
          aria-label="Next photograph"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="lightbox-thumbs-bar" role="tablist">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`lightbox-thumb ${idx === currentIndex ? 'is-active' : ''}`}
            onClick={() => onSelectIndex(idx)}
            aria-label={`Go to photograph ${idx + 1}`}
            role="tab"
            aria-selected={idx === currentIndex}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
