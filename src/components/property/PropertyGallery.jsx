import React, { useState } from 'react';
import { Camera, Maximize } from 'lucide-react';
import LightboxModal from './LightboxModal';

export default function PropertyGallery({ images = [], propertyTitle = 'Residence' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightboxAt = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <>
      <div className="property-gallery-mosaic reveal-init">
        {/* Primary Hero Image */}
        <div
          className="gallery-hero-wrapper"
          onClick={() => openLightboxAt(0)}
          role="button"
          tabIndex={0}
          aria-label="Enlarge primary photograph"
        >
          <img
            src={images[0]}
            alt={`${propertyTitle} - Architectural Facade`}
            className="gallery-hero-img"
          />
          <div className="gallery-img-hover-overlay">
            <Maximize size={24} color="var(--accent-gold)" />
          </div>
        </div>

        {/* Secondary Grid Images */}
        <div className="gallery-subgrid">
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx + 1}
              className="gallery-sub-item"
              onClick={() => openLightboxAt(idx + 1)}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge photograph ${idx + 2}`}
            >
              <img src={img} alt={`${propertyTitle} interior ${idx + 1}`} />
              <div className="gallery-img-hover-overlay">
                <Maximize size={18} color="var(--accent-gold)" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Trigger */}
        <button
          onClick={() => openLightboxAt(0)}
          className="btn gallery-view-all-btn"
          aria-label={`View all ${images.length} architectural photographs`}
        >
          <Camera size={16} />
          <span>View All {images.length} Photographs</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setCurrentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        propertyTitle={propertyTitle}
      />
    </>
  );
}
