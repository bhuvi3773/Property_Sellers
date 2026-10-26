# Vault & Vista — Architectural Residences (India)

> Curators of India's most coveted residential architecture, private estates, sea-facing penthouses, and heritage havelis.

![Vault & Vista Architectural Real Estate](https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=90)

## Overview

**Vault & Vista** is a luxury real estate frontend web application designed with editorial aesthetic excellence, motion design, and complete localization to premier Indian markets. Every estate is represented strictly in **Indian Rupees (₹ Crores for acquisitions, ₹ Lakhs/mo for tenancies)** across Mumbai, New Delhi, Goa, Bengaluru, Udaipur, Alibaug, and Hyderabad.

---

## ✨ Key Features & Motion Architecture

1. **Pinned Horizontal Scroll Showcase (`HorizontalScrollShowcase.jsx`)**
   - When scrolling down, the section pins seamlessly to the viewport.
   - Listed properties smoothly glide in from the right across the screen with hardware-accelerated GPU translation.
   - Includes live numerical counter (`01 / 06`), dynamic golden progress bar, and directional prompt hints.
   - Once all items traverse across the screen, the section unpins naturally, continuing normal vertical scroll down.
   - Scrolling up reverses the sequence, returning cards back to the right.

2. **Bidirectional Scroll Motion (`useDirectionalScroll.js`)**
   - As the user scrolls down, alternating grid cards subtly displace left and right.
   - When the user scrolls up or pauses, elements gracefully rearrange and restore back to aligned coordinates with a smooth cubic-bezier spring curve.

3. **Strict Indian Luxury Localization & ₹ Currency**
   - **Locations:** Mumbai (Malabar Hill, Worli Sea Face, Altamount Road, Pali Hill, Juhu), New Delhi (Lutyens' Bungalow Zone, Chanakyapuri, Golf Links, Jor Bagh), Goa (Assagao, Anjuna, Moira), Bengaluru (Sadashivanagar, Indiranagar), Udaipur (Lake Pichola), Alibaug, and Hyderabad.
   - **Pricing:** Expressed purely in **₹ Cr** (e.g. ₹18.5 Cr – ₹145.0 Cr) and **₹ L / mo** (e.g. ₹3.2 L/mo – ₹18.0 L/mo), with unit metrics in **₹ / sq ft**. Zero foreign currency symbols.

4. **Visually Stunning Architectural Emblem (`Logo.jsx`)**
   - Custom-engineered geometric gold SVG emblem featuring an interlocking diamond shield, arch vault, keystone pillar, radiant vista horizon line, and zenith sparkle.
   - 100% mobile-responsive typography with seamless scaling across desktop, tablet, and compact mobile viewports (320px+).

5. **Analytical Specification Comparison Matrix (`/compare`)**
   - Side-by-side spec comparison of up to 4 candidate properties.
   - Interactive difference highlighting, carpet areas, architectural eras, amenities check-matrix, and unit metrics.

6. **Interactive Discovery & Filtering (`/buy`, `/rent`)**
   - Multi-parameter filtering by City, Typology, Price in ₹, Bedrooms, Bathrooms, and Curated Amenities.
   - Switchable Grid and List view layouts with URL parameter synchronization.

7. **Client-Side Safe Verification & Dossiers (`/sell`, `/contact`)**
   - Multi-step residence placement wizard and private concierge inquiry modals with explicit demo notices and zero external data transmission.

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Bundler & Dev Server:** Vite 8
- **Routing:** React Router DOM v6
- **Styling:** Modular Vanilla CSS Design System with CSS Custom Properties (`tokens.css`, `main.css`, `header-nav.css`, `property.css`, `forms.css`)
- **Icons:** Lucide React
- **Typography:** Cinzel, Cormorant Garamond, Plus Jakarta Sans (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bhuvi3773/Property_Sellers.git

# Navigate to the project directory
cd Property_Sellers

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
MIT License. Created for architectural real estate design excellence.
