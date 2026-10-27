import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LOCATIONS, CATEGORIES } from '../../data/properties';

export default function QuickFilterBar() {
  const [listingType, setListingType] = useState('sale'); // 'sale' | 'rent'
  const [location, setLocation] = useState('All Locations');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const targetRoute = listingType === 'sale' ? '/buy' : '/rent';
    const params = new URLSearchParams();

    if (location && location !== 'All Locations') {
      params.set('location', location);
    }
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (maxPrice && maxPrice !== 'all') {
      params.set('maxPrice', maxPrice);
    }

    navigate(`${targetRoute}?${params.toString()}`);
  };

  return (
    <div className="quick-filter-wrapper reveal-init">
      {/* Listing Type Switcher */}
      <div className="filter-type-tabs">
        <button
          type="button"
          className={`filter-tab ${listingType === 'sale' ? 'is-active' : ''}`}
          onClick={() => setListingType('sale')}
        >
          Acquire (Sale)
        </button>
        <button
          type="button"
          className={`filter-tab ${listingType === 'rent' ? 'is-active' : ''}`}
          onClick={() => setListingType('rent')}
        >
          Private Lease (Rent)
        </button>
      </div>

      {/* Inputs Form Grid */}
      <form onSubmit={handleSearch} className="quick-filter-grid">
        {/* Location Dropdown */}
        <div className="filter-select-group">
          <label htmlFor="quick-location">Prime Location</label>
          <select
            id="quick-location"
            className="filter-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="filter-select-group">
          <label htmlFor="quick-category">Architectural Type</label>
          <select
            id="quick-category"
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Max Budget Dropdown */}
        <div className="filter-select-group">
          <label htmlFor="quick-price">
            {listingType === 'sale' ? 'Maximum Budget' : 'Maximum Monthly Rent'}
          </label>
          <select
            id="quick-price"
            className="filter-select"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="all">Any Price</option>
            {listingType === 'sale' ? (
              <>
                <option value="250000000">Up to ₹25 Crore</option>
                <option value="500000000">Up to ₹50 Crore</option>
                <option value="750000000">Up to ₹75 Crore</option>
                <option value="1500000000">Up to ₹150 Crore+</option>
              </>
            ) : (
              <>
                <option value="500000">Up to ₹5 Lakh / mo</option>
                <option value="800000">Up to ₹8 Lakh / mo</option>
                <option value="1200000">Up to ₹12 Lakh / mo</option>
                <option value="2000000">Up to ₹20 Lakh+ / mo</option>
              </>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary" style={{ height: '48px', marginTop: '1.25rem' }}>
            <span>Explore Portfolio</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
