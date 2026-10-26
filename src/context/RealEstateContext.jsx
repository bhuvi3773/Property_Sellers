import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES } from '../data/properties';

const RealEstateContext = createContext();

export function RealEstateProvider({ children }) {
  // Favourites state synced with localStorage
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('vv_favourites');
      return saved ? JSON.parse(saved) : ['prop-01', 'prop-03'];
    } catch {
      return ['prop-01', 'prop-03'];
    }
  });

  // Comparison list (up to 4 properties) synced with localStorage
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('vv_compare');
      return saved ? JSON.parse(saved) : ['prop-01', 'prop-02'];
    } catch {
      return ['prop-01', 'prop-02'];
    }
  });

  // Global Toast notification system
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // Signature Thonik Fullscreen Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Enquiry / Schedule viewing modal state
  const [enquiryModal, setEnquiryModal] = useState({
    isOpen: false,
    property: null,
    type: 'enquiry' // 'enquiry' | 'schedule'
  });

  // Persist favourites
  useEffect(() => {
    try {
      localStorage.setItem('vv_favourites', JSON.stringify(favourites));
    } catch (e) {
      console.warn('Unable to persist favourites to localStorage', e);
    }
  }, [favourites]);

  // Persist compare list
  useEffect(() => {
    try {
      localStorage.setItem('vv_compare', JSON.stringify(compareList));
    } catch (e) {
      console.warn('Unable to persist comparison list to localStorage', e);
    }
  }, [compareList]);

  // Lock body scroll when full-screen menu or modal is open
  useEffect(() => {
    if (isMenuOpen || enquiryModal.isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen, enquiryModal.isOpen]);

  // Toast trigger
  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3600);
  };

  // Toggle favourite
  const toggleFavourite = (propertyId) => {
    const prop = PROPERTIES.find(p => p.id === propertyId);
    const title = prop ? prop.title : 'Residence';
    
    setFavourites(prev => {
      if (prev.includes(propertyId)) {
        showToast(`Removed "${title}" from your private collection.`, 'info');
        return prev.filter(id => id !== propertyId);
      } else {
        showToast(`Saved "${title}" to your private collection.`, 'success');
        return [...prev, propertyId];
      }
    });
  };

  const isFavourite = (propertyId) => favourites.includes(propertyId);

  // Toggle compare (limit max 4 properties)
  const toggleCompare = (propertyId) => {
    const prop = PROPERTIES.find(p => p.id === propertyId);
    const title = prop ? prop.title : 'Residence';

    setCompareList(prev => {
      if (prev.includes(propertyId)) {
        showToast(`Removed "${title}" from comparison matrix.`, 'info');
        return prev.filter(id => id !== propertyId);
      } else {
        if (prev.length >= 4) {
          showToast('Comparison limit reached (max 4 residences). Remove one to add another.', 'warn');
          return prev;
        }
        showToast(`Added "${title}" to comparison matrix.`, 'success');
        return [...prev, propertyId];
      }
    });
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison matrix cleared.', 'info');
  };

  // Menu controls
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Enquiry modal controls
  const openEnquiry = (property = null, type = 'enquiry') => {
    setEnquiryModal({ isOpen: true, property, type });
  };
  const closeEnquiry = () => {
    setEnquiryModal({ isOpen: false, property: null, type: 'enquiry' });
  };

  return (
    <RealEstateContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        favouritesCount: favourites.length,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        compareCount: compareList.length,
        toast,
        showToast,
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        enquiryModal,
        openEnquiry,
        closeEnquiry,
        allProperties: PROPERTIES
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
}

export function useRealEstate() {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
}
