// Header.js - Premium Luxury Fashion Header
import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

// SVG Icons as React components
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const GemIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
    <path d="m12 22 4-6"></path>
    <path d="M16 3l4 6"></path>
    <path d="M8 9l8 12"></path>
    <path d="M8 3l-4 6"></path>
    <path d="M12 22 4 9"></path>
  </svg>
);

function Header({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  cartCount, 
  favoritesCount, 
  onCartClick,
  searchQuery = '',
  onSearchChange,
  sortBy = 'name',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  totalItems = 0,
  isScrolled = false,
  isWishlistAnimating = false
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search logic is handled by parent component through onSearchChange
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategorySelect = (categoryId) => {
    onCategoryChange(categoryId);
    setIsMobileMenuOpen(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // Category icons mapping
  const getCategoryIcon = (categoryId) => {
    const icons = {
      'mens': '👔',
      'womens': '👗',
      'electronics': '📱',
      'jewelery': '💎',
      'all': '🛍️'
    };
    return icons[categoryId] || '✨';
  };

  return (
    <>
      <header className={`premium-header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {/* Premium Background Effects */}
        <div className="header-background-premium">
          <div className="header-glow-effect"></div>
          <div className="header-shine"></div>
          <div className="floating-sparkles">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="sparkle" style={{
                animationDelay: `${i * 0.8}s`,
                left: `${10 + i * 12}%`
              }} />
            ))}
          </div>
        </div>

        <div className="header-container-premium">
          {/* Luxury Brand Section */}
          <div className="header-brand-premium">
            <div className="logo-container-premium">
              <div className="logo-icon-premium">
                <GemIcon />
              </div>
              <div className="brand-text">
                <h1 className="brand-name">
                  <span className="brand-name-main">cKzn</span>
                  <span className="brand-name-sub">COUTURE</span>
                </h1>
                <div className="brand-tagline">Kzn  store</div>
              </div>
              <div className="logo-glow-premium"></div>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <nav className="header-nav-premium">
            {/* Category Navigation */}
            <div className="category-nav-premium">
              <button
                className={`category-nav-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => onCategoryChange('all')}
              >
                <span className="nav-icon">🛍️</span>
                <span className="nav-text">All Collections</span>
                <span className="nav-indicator"></span>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-nav-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  <span className="nav-icon">{getCategoryIcon(category.id)}</span>
                  <span className="nav-text">{category.title}</span>
                  <span className="nav-indicator"></span>
                </button>
              ))}
            </div>

            {/* Premium Search Bar */}
            <div className={`search-container-premium ${isSearchExpanded ? 'expanded' : ''} ${isSearchFocused ? 'focused' : ''}`}>
              <form onSubmit={handleSearchSubmit} className="search-form-premium">
                <div className="search-input-container">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Discover luxury pieces..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="search-input-premium"
                  />
                  <button 
                    type="button"
                    className="search-toggle-btn"
                    onClick={handleSearchToggle}
                  >
                    <SearchIcon />
                  </button>
                </div>
                {isSearchExpanded && (
                  <div className="search-suggestions-premium">
                    <div className="suggestion-header">Popular Searches</div>
                    <div className="suggestion-item-premium">
                      <span className="suggestion-icon">✨</span>
                      "Designer Handbags"
                    </div>
                    <div className="suggestion-item-premium">
                      <span className="suggestion-icon">💎</span>
                      "Luxury Watches"
                    </div>
                    <div className="suggestion-item-premium">
                      <span className="suggestion-icon">👑</span>
                      "Premium Accessories"
                    </div>
                  </div>
                )}
              </form>
            </div>
          </nav>

          {/* Premium Header Actions */}
          <div className="header-actions-premium">
            {/* View Mode Toggle */}
            <div className="view-mode-premium">
              <button 
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => onViewModeChange('grid')}
                title="Grid View"
              >
                <GridIcon />
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => onViewModeChange('list')}
                title="List View"
              >
                <ListIcon />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-premium">
              <select 
                value={sortBy} 
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select-premium"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="select-arrow"></div>
            </div>

            {/* Favorites with Animation */}
            <div 
              className={`header-action-premium favorites-action ${isWishlistAnimating ? 'animating' : ''}`}
              onClick={() => {/* Add favorites modal */}}
            >
              <div className="action-icon-wrapper">
                <HeartIcon filled={favoritesCount > 0} />
                {favoritesCount > 0 && (
                  <span className="action-badge-premium">{favoritesCount}</span>
                )}
              </div>
              <span className="action-label">Wishlist</span>
              <div className="action-hover-effect"></div>
            </div>

            {/* Cart with Enhanced Animation */}
            <div 
              className="header-action-premium cart-action cart-trigger"
              onClick={onCartClick}
            >
              <div className="action-icon-wrapper">
                <ShoppingBagIcon />
                {cartCount > 0 && (
                  <span className="action-badge-premium pulse">{cartCount}</span>
                )}
              </div>
              <span className="action-label">Cart</span>
              <div className="action-hover-effect"></div>
            </div>

            {/* User Profile */}
            <div className="header-action-premium profile-action">
              <div className="user-avatar-premium">
                <UserIcon />
              </div>
              <span className="action-label">Account</span>
              <div className="action-hover-effect"></div>
            </div>

            {/* Premium Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle-premium"
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Luxury Stats Bar */}
        <div className="header-stats-premium">
          <div className="stats-container">
            <div className="stat-item-premium">
              <span className="stat-icon">💎</span>
              <div className="stat-content">
                <span className="stat-number">{totalItems}+</span>
                <span className="stat-label">Premium Items</span>
              </div>
            </div>
            <div className="stat-item-premium">
              <span className="stat-icon">
                <TruckIcon />
              </span>
              <div className="stat-content">
                <span className="stat-number">Free</span>
                <span className="stat-label">Express Shipping</span>
              </div>
            </div>
            <div className="stat-item-premium">
              <span className="stat-icon">
                <StarIcon />
              </span>
              <div className="stat-content">
                <span className="stat-number">5-Star</span>
                <span className="stat-label">Rated Quality</span>
              </div>
            </div>
            <div className="stat-item-premium">
              <span className="stat-icon">
                <ShieldIcon />
              </span>
              <div className="stat-content">
                <span className="stat-number">Secure</span>
                <span className="stat-label">Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu */}
      <div className={`mobile-menu-premium ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content-premium">
          {/* Mobile Search */}
          <div className="mobile-search-premium">
            <div className="mobile-search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search luxury collections..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mobile-search-input-premium"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="mobile-nav-premium">
            <div className="mobile-categories-premium">
              <div className="mobile-section-title">Collections</div>
              <button
                className={`mobile-category-btn-premium ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('all')}
              >
                <span className="mobile-category-icon">🛍️</span>
                <span className="mobile-category-text">All Collections</span>
                <span className="mobile-category-arrow">→</span>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`mobile-category-btn-premium ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span className="mobile-category-icon">{getCategoryIcon(category.id)}</span>
                  <span className="mobile-category-text">{category.title}</span>
                  <span className="mobile-category-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="mobile-actions-premium">
              <div className="mobile-section-title">Account</div>
              <button className="mobile-action-btn-premium" onClick={() => {/* Favorites */}}>
                <HeartIcon />
                <span>Wishlist ({favoritesCount})</span>
              </button>
              <button className="mobile-action-btn-premium" onClick={onCartClick}>
                <ShoppingBagIcon />
                <span>Cart ({cartCount})</span>
              </button>
              <button className="mobile-action-btn-premium">
                <UserIcon />
                <span>My Account</span>
              </button>
            </div>

            {/* Mobile View Controls */}
            <div className="mobile-controls-premium">
              <div className="mobile-section-title">Display</div>
              <div className="mobile-view-controls">
                <button 
                  className={`mobile-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => onViewModeChange('grid')}
                >
                  <GridIcon />
                  Grid View
                </button>
                <button 
                  className={`mobile-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => onViewModeChange('list')}
                >
                  <ListIcon />
                  List View
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-backdrop-premium"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Header;