import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, X, Sparkles, Key } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PropertyCard from '../components/property/PropertyCard';
import FilterDrawer from '../components/property/FilterDrawer';
import { SkeletonCard, EmptyState } from '../components/common/CommonComponents';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function RentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allProperties } = useRealEstate();
  useScrollReveal();

  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || 'All Locations',
    category: searchParams.get('category') || 'all',
    minBeds: searchParams.get('minBeds') || 'any',
    minBaths: searchParams.get('minBaths') || 'any',
    maxPrice: searchParams.get('maxPrice') || 'all',
    amenities: searchParams.get('amenities') ? searchParams.get('amenities').split(',') : [],
    isNew: false
  });

  const [sortBy, setSortBy] = useState('price-desc');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.location !== 'All Locations') params.set('location', filters.location);
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.minBeds !== 'any') params.set('minBeds', filters.minBeds);
    if (filters.minBaths !== 'any') params.set('minBaths', filters.minBaths);
    if (filters.maxPrice !== 'all') params.set('maxPrice', filters.maxPrice);
    if (filters.amenities.length > 0) params.set('amenities', filters.amenities.join(','));
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(6);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setFilters({
      keyword: '',
      location: 'All Locations',
      category: 'all',
      minBeds: 'any',
      minBaths: 'any',
      maxPrice: 'all',
      amenities: [],
      isNew: false
    });
    setVisibleCount(6);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Filter & Sort properties for 'rent'
  const filteredProperties = useMemo(() => {
    let result = allProperties.filter((p) => p.listingType === 'rent');

    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.locality.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.architecturalStyle.toLowerCase().includes(q)
      );
    }

    if (filters.location !== 'All Locations') {
      result = result.filter((p) => p.location.city === filters.location);
    }

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minBeds !== 'any') {
      result = result.filter((p) => p.bedrooms >= parseInt(filters.minBeds, 10));
    }

    if (filters.minBaths !== 'any') {
      result = result.filter((p) => p.bathrooms >= parseInt(filters.minBaths, 10));
    }

    if (filters.maxPrice !== 'all') {
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice, 10));
    }

    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      return 0;
    });

    return result;
  }, [allProperties, filters, sortBy]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.keyword) chips.push({ key: 'keyword', label: `Search: "${filters.keyword}"` });
    if (filters.location !== 'All Locations') chips.push({ key: 'location', label: `City: ${filters.location}` });
    if (filters.category !== 'all') chips.push({ key: 'category', label: `Type: ${filters.category}` });
    if (filters.minBeds !== 'any') chips.push({ key: 'minBeds', label: `${filters.minBeds}+ Beds` });
    if (filters.minBaths !== 'any') chips.push({ key: 'minBaths', label: `${filters.minBaths}+ Baths` });
    if (filters.maxPrice !== 'all') chips.push({ key: 'maxPrice', label: `Under ₹${(parseInt(filters.maxPrice, 10) / 100000).toFixed(0)} Lakh / mo` });
    filters.amenities.forEach((a) => chips.push({ key: 'amenity', label: a, value: a }));
    return chips;
  }, [filters]);

  const removeChip = (chip) => {
    if (chip.key === 'amenity') {
      handleFilterChange('amenities', filters.amenities.filter((a) => a !== chip.value));
    } else if (chip.key === 'location') {
      handleFilterChange('location', 'All Locations');
    } else if (chip.key === 'category') {
      handleFilterChange('category', 'all');
    } else if (chip.key === 'minBeds' || chip.key === 'minBaths') {
      handleFilterChange(chip.key, 'any');
    } else if (chip.key === 'maxPrice') {
      handleFilterChange('maxPrice', 'all');
    } else if (chip.key === 'keyword') {
      handleFilterChange('keyword', '');
    }
  };

  const visibleProperties = filteredProperties.slice(0, visibleCount);

  return (
    <div className="discovery-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container-wide">
        <Breadcrumbs items={[{ label: 'Private Leases & Tenancies' }]} />

        {/* Discovery Page Header */}
        <div className="section-header-split" style={{ marginBottom: '2.5rem' }}>
          <div>
            <div className="editorial-tag">Curated Tenancies</div>
            <h1 className="section-title">Private Leases</h1>
            <p className="section-subtitle">
              Fully serviced turnkey residences, coastal villas, and heritage estates for discerning long-term and executive tenancies across India in Indian Rupees (₹).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-secondary mobile-only-btn"
              aria-label="Open Filter Drawer"
            >
              <SlidersHorizontal size={16} />
              <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner on Rental Services */}
        <div className="rental-services-banner reveal-init" style={{ marginBottom: '2.5rem' }}>
          <div className="rental-service-item">
            <Key size={18} color="var(--accent-gold)" />
            <span>Turnkey Designer Furnished with Curated Fine Art</span>
          </div>
          <div className="rental-service-item">
            <Sparkles size={18} color="var(--accent-gold)" />
            <span>Dedicated Butler & On-Call Housekeeping Concierge</span>
          </div>
        </div>

        {/* Discovery Layout: Sidebar + Grid */}
        <div className="discovery-layout-grid">
          <aside className="discovery-sidebar">
            <FilterDrawer
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredProperties.length}
            />
          </aside>

          <main className="discovery-results-column">
            <div className="discovery-toolbar">
              <div className="discovery-count-text">
                Showing <strong>{visibleProperties.length}</strong> of <strong>{filteredProperties.length}</strong> Curated Leases
              </div>

              <div className="discovery-toolbar-controls">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ArrowUpDown size={14} color="var(--text-muted)" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select-field"
                    style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <option value="price-desc">Rent: Highest First</option>
                    <option value="price-asc">Rent: Lowest First</option>
                    <option value="area-desc">Floor Area: Largest First</option>
                  </select>
                </div>

                <div className="view-mode-toggle" role="group" aria-label="View Mode">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`view-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Chips */}
            {activeChips.length > 0 && (
              <div className="active-chips-row">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Active Filters:
                </span>
                {activeChips.map((chip, idx) => (
                  <span key={idx} className="filter-chip">
                    <span>{chip.label}</span>
                    <button onClick={() => removeChip(chip)} className="chip-remove-btn">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button onClick={handleResetFilters} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
                  Clear All
                </button>
              </div>
            )}

            {isLoading ? (
              <div className={viewMode === 'grid' ? 'properties-grid' : 'properties-list'}>
                {[1, 2, 3, 4].map((n) => (
                  <SkeletonCard key={n} viewMode={viewMode} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <EmptyState
                title="No Private Leases Found"
                description="No leasehold properties currently match your selected filters. Contact our private concierge for off-market tenancies."
                onAction={handleResetFilters}
                actionText="Reset All Filters"
              />
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'properties-grid' : 'properties-list'}>
                  {visibleProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                  ))}
                </div>

                {visibleCount < filteredProperties.length && (
                  <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="btn btn-secondary btn-lg"
                    >
                      Load Remaining Leases ({filteredProperties.length - visibleCount} Available)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <FilterDrawer
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredProperties.length}
        isMobileDrawer={true}
        isOpen={isMobileFilterOpen}
        onCloseMobile={() => setIsMobileFilterOpen(false)}
      />
    </div>
  );
}
