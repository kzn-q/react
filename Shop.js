// Shop.js - Premium Luxury Fashion Experience (No External Icons)
import React, { useState, useEffect, useRef } from "react";
import "./Shop.css";
import SHOP_DATA from "./shop-data";
import Header from "./Header";
import Cart from "./Cart";

// SVG Icons as React components (No external dependency)
const ShoppingBagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ZoomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const CrownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
  </svg>
);

const GemIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
    <path d="m12 22 4-6"></path>
    <path d="M16 3l4 6"></path>
    <path d="M8 9l8 12"></path>
    <path d="M8 3l-4 6"></path>
    <path d="M12 22 4 9"></path>
  </svg>
);

function Shop() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading with enhanced animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced notification system
  const showNotification = (message, type = 'success', icon = '✨') => {
    setNotification({ message, type, icon });
    setTimeout(() => setNotification(null), 3500);
  };

  // Premium add to cart with enhanced feedback
  const addToCart = (item, e, options = {}) => {
    if (e) e.stopPropagation();
    
    const size = options.size || 'M';
    const color = options.color || 'Default';
    
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && cartItem.size === size && cartItem.color === color
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += (options.quantity || 1);
      setCart(updatedCart);
      showNotification(`${item.name} quantity updated!`, 'info', '🔄');
    } else {
      setCart([...cart, { 
        ...item, 
        quantity: options.quantity || 1,
        size,
        color,
        addedAt: new Date().toISOString()
      }]);
      showNotification(`${item.name} added to cart!`, 'success', '🛍️');
    }

    // Add cart animation effect
    if (headerRef.current) {
      const cartBtn = headerRef.current.querySelector('.cart-trigger');
      if (cartBtn) {
        cartBtn.classList.add('pulse');
        setTimeout(() => cartBtn.classList.remove('pulse'), 600);
      }
    }
  };

  const quickAddToCart = (item) => {
    addToCart(item, null, { quantity: 1 });
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCart(updatedCart);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter(cartItem => 
      !(cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color)
    );
    setCart(updatedCart);
    showNotification(`${item.name} removed from cart`, 'warning', '🗑️');
  };

  // Enhanced favorite with animation
  const toggleFavorite = (item, e) => {
    if (e) e.stopPropagation();
    
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
      showNotification(`${item.name} removed from favorites`, 'info', '💔');
    } else {
      setFavorites([...favorites, item]);
      showNotification(`${item.name} added to favorites!`, 'success', '❤️');
      setIsWishlistAnimating(true);
      setTimeout(() => setIsWishlistAnimating(false), 1000);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  };

  // Enhanced modal with size/color selection
  const openModal = (item) => {
    setSelectedProduct(item);
    setQuantity(1);
    setSelectedSizes(prev => ({ ...prev, [item.id]: 'M' }));
    setSelectedColors(prev => ({ ...prev, [item.id]: 'Black' }));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setTimeout(() => {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 150);
  };

  const openCart = () => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleCheckout = () => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    showNotification(`Order confirmed! Total: $${total.toFixed(2)}`, 'success', '🎉');
    setCart([]);
    closeCart();
  };

  // Enhanced product data with additional properties
  const enhancedCategories = SHOP_DATA.map(category => ({
    ...category,
    items: category.items.map(item => ({
      ...item,
      sizes: item.sizes || ['XS', 'S', 'M', 'L', 'XL'],
      colors: item.colors || ['Black', 'White', 'Navy', 'Beige'],
      rating: item.rating || (4 + Math.random()).toFixed(1),
      reviewCount: item.reviewCount || Math.floor(Math.random() * 200) + 50,
      isPremium: Math.random() > 0.7,
      isEcoFriendly: Math.random() > 0.5,
    }))
  }));

  const categories = enhancedCategories.map(category => ({
    id: category.id,
    title: category.title
  }));

  const filteredCategories = enhancedCategories
    .filter(category => activeCategory === 'all' || category.id === activeCategory)
    .map(category => ({
      ...category,
      items: category.items
        .filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            case 'name':
            default:
              return a.name.localeCompare(b.name);
          }
        })
    }))
    .filter(category => category.items.length > 0);

  const totalItems = filteredCategories.reduce((total, category) => total + category.items.length, 0);

  // Render star rating component
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="star-wrapper">
            {star <= fullStars ? (
              <StarIcon filled />
            ) : star === fullStars + 1 && hasHalfStar ? (
              <span className="star-half">⭐</span>
            ) : (
              <StarIcon />
            )}
          </span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className={`shop-container ${isLoading ? 'loading' : 'loaded'}`}>
      {/* Enhanced Animated Background */}
      <div className="premium-background">
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Premium Notification System */}
      {notification && (
        <div className={`premium-notification ${notification.type}`}>
          <div className="notification-icon">{notification.icon}</div>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
          </div>
          <div className="notification-progress"></div>
        </div>
      )}

      {/* Enhanced Header with Ref */}
      <div ref={headerRef}>
        <Header 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
          favoritesCount={favorites.length}
          onCartClick={openCart}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalItems={totalItems}
          isScrolled={isScrolled}
          isWishlistAnimating={isWishlistAnimating}
        />
      </div>

      {/* Premium Loading Skeleton */}
      {isLoading ? (
        <div className="premium-skeleton-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="premium-skeleton-card">
              <div className="skeleton-image-wrapper">
                <div className="skeleton-image"></div>
                <div className="skeleton-badge"></div>
              </div>
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-text"></div>
                <div className="skeleton-line skeleton-price"></div>
                <div className="skeleton-actions">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={gridRef} className={`shop-content premium-view-${viewMode}`}>
          {filteredCategories.length === 0 ? (
            <div className="premium-empty-state">
              <div className="empty-state-icon">
                <SearchIcon />
              </div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="premium-button secondary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <section 
                id={`category-${category.id}`}
                className="premium-category-section" 
                key={category.id}
              >
                <div className="category-header-premium">
                  <div className="category-title-wrapper">
                    <h2 className="category-title-gold">{category.title}</h2>
                    <div className="category-decoration">
                      <GemIcon />
                    </div>
                  </div>
                  <span className="category-count-badge">
                    {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                
                <div className={`premium-items-${viewMode}`}>
                  {category.items.map((item, index) => (
                    <div 
                      className={`premium-product-card ${item.isPremium ? 'premium-badge' : ''}`}
                      key={item.id}
                      onClick={() => openModal(item)}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        '--card-index': index 
                      }}
                    >
                      {/* Premium Badges */}
                      <div className="product-badges">
                        {item.isNew && (
                          <span className="badge new-premium">
                            <span className="badge-icon">✨</span>
                            NEW
                          </span>
                        )}
                        {item.isTrending && (
                          <span className="badge trending-premium">
                            <CrownIcon />
                            TRENDING
                          </span>
                        )}
                        {item.isPremium && (
                          <span className="badge premium-exclusive">
                            <GemIcon />
                            PREMIUM
                          </span>
                        )}
                        {item.isEcoFriendly && (
                          <span className="badge eco-friendly">
                            🌱 ECO
                          </span>
                        )}
                      </div>
                      
                      {/* Product Image with Enhanced Overlay */}
                      <div className="product-image-container">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="product-image-premium"
                          loading="lazy"
                        />
                        <div className="product-image-overlay">
                          <button 
                            className="quick-view-btn"
                            onClick={(e) => { e.stopPropagation(); openModal(item); }}
                          >
                            <ZoomIcon />
                            Quick View
                          </button>
                          
                          <button 
                            className={`favorite-btn-premium ${isFavorite(item.id) ? 'active' : ''}`}
                            onClick={(e) => toggleFavorite(item, e)}
                          >
                            <HeartIcon filled={isFavorite(item.id)} />
                          </button>
                        </div>
                        
                        {/* Quick Add Button */}
                        <button 
                          className="quick-add-btn-premium"
                          onClick={(e) => { e.stopPropagation(); quickAddToCart(item); }}
                        >
                          <ShoppingBagIcon />
                          Add to Cart
                        </button>
                      </div>
                      
                      {/* Enhanced Product Content */}
                      <div className="product-content-premium">
                        <div className="product-header">
                          <h3 className="product-title">{item.name}</h3>
                          {item.isPremium && <span className="premium-indicator">✨</span>}
                        </div>
                        
                        <p className="product-description-premium">
                          {item.description?.substring(0, 100)}...
                        </p>
                        
                        {/* Rating and Reviews */}
                        <div className="product-rating-section">
                          {renderStars(item.rating)}
                          <span className="review-count">({item.reviewCount} reviews)</span>
                        </div>
                        
                        {/* Color Swatches Preview */}
                        <div className="color-swatches-preview">
                          {item.colors.slice(0, 3).map((color, idx) => (
                            <div 
                              key={idx}
                              className="color-swatch-preview"
                              style={{ 
                                backgroundColor: color.toLowerCase(),
                                border: color.toLowerCase() === 'white' ? '1px solid #e5e5e5' : 'none'
                              }}
                              title={color}
                            />
                          ))}
                          {item.colors.length > 3 && (
                            <div className="color-more">+{item.colors.length - 3}</div>
                          )}
                        </div>
                        
                        <div className="product-footer-premium">
                          <div className="price-section-premium">
                            <p className="product-price-main">${item.price}</p>
                            {item.originalPrice && (
                              <p className="product-price-original">${item.originalPrice}</p>
                            )}
                            {item.isPremium && (
                              <div className="premium-shipping">Free Shipping</div>
                            )}
                          </div>
                          
                          <div className="product-actions-premium">
                            <button 
                              className="premium-button primary small"
                              onClick={(e) => addToCart(item, e)}
                            >
                              <ShoppingBagIcon />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      )}

      {/* Enhanced Premium Product Modal */}
      {selectedProduct && (
        <div className="premium-modal-overlay" onClick={handleOverlayClick}>
          <div className="premium-modal">
            <button className="premium-modal-close" onClick={closeModal}>
              <XIcon />
            </button>
            
            <div className="premium-modal-content">
              <div className="modal-image-section">
                <div className="modal-image-container-premium">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name}
                    className="modal-image-premium"
                  />
                  <div className="modal-image-badges">
                    {selectedProduct.isNew && (
                      <span className="badge new-premium">
                        <span className="badge-icon">✨</span>
                        NEW ARRIVAL
                      </span>
                    )}
                    {selectedProduct.isPremium && (
                      <span className="badge premium-exclusive">
                        <GemIcon />
                        PREMIUM COLLECTION
                      </span>
                    )}
                  </div>
                  <button className="image-zoom-btn">
                    <ZoomIcon />
                  </button>
                </div>
              </div>
              
              <div className="modal-details-section">
                <div className="modal-header-premium">
                  <div className="product-title-section">
                    <h2 className="modal-title-premium">{selectedProduct.name}</h2>
                    {selectedProduct.isPremium && (
                      <div className="premium-badge-modal">
                        <GemIcon />
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="modal-rating-premium">
                    {renderStars(selectedProduct.rating)}
                    <span className="review-count-modal">
                      {selectedProduct.reviewCount} reviews
                    </span>
                  </div>
                </div>
                
                <div className="modal-price-section-premium">
                  <div className="price-main-modal">
                    <span className="current-price">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="original-price-modal">${selectedProduct.originalPrice}</span>
                    )}
                  </div>
                  {selectedProduct.isPremium && (
                    <div className="premium-benefits">
                      <span className="benefit-item">✨ Free Shipping</span>
                      <span className="benefit-item">🎁 Gift Packaging</span>
                    </div>
                  )}
                </div>
                
                <p className="modal-description-premium">
                  {selectedProduct.description || "Experience unparalleled quality with our premium collection. Meticulously crafted with the finest materials and attention to detail for the discerning customer."}
                </p>
                
                {/* Size Selection */}
                <div className="size-selection">
                  <h4>Select Size</h4>
                  <div className="size-options">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSizes[selectedProduct.id] === size ? 'selected' : ''}`}
                        onClick={() => setSelectedSizes(prev => ({
                          ...prev,
                          [selectedProduct.id]: size
                        }))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div className="color-selection">
                  <h4>Select Color</h4>
                  <div className="color-options">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${selectedColors[selectedProduct.id] === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColors(prev => ({
                          ...prev,
                          [selectedProduct.id]: color
                        }))}
                        title={color}
                      >
                        <div 
                          className="color-swatch"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        <span className="color-name">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="quantity-selector-premium">
                  <h4>Quantity</h4>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      <MinusIcon />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="modal-actions-premium">
                  <button 
                    className="premium-button secondary"
                    onClick={(e) => toggleFavorite(selectedProduct, e)}
                  >
                    <HeartIcon filled={isFavorite(selectedProduct.id)} />
                    {isFavorite(selectedProduct.id) ? 'Saved' : 'Save'}
                  </button>
                  
                  <button 
                    className="premium-button primary large"
                    onClick={(e) => addToCart(selectedProduct, e, {
                      quantity,
                      size: selectedSizes[selectedProduct.id],
                      color: selectedColors[selectedProduct.id]
                    })}
                  >
                    <ShoppingBagIcon />
                    Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                  </button>
                </div>
                
                {/* Premium Features */}
                <div className="premium-features-grid">
                  <div className="feature-item">
                    <TruckIcon />
                    <div>
                      <strong>Free Shipping</strong>
                      <span>On orders over $50</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <RefreshIcon />
                    <div>
                      <strong>30-Day Returns</strong>
                      <span>Easy return policy</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <ShieldIcon />
                    <div>
                      <strong>2-Year Warranty</strong>
                      <span>Quality guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Premium Floating Action Button */}
      <button 
        className={`premium-fab ${cart.length > 0 ? 'has-items' : ''}`}
        onClick={openCart}
      >
        <ShoppingBagIcon />
        {cart.length > 0 && (
          <span className="fab-badge-premium">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
        <div className="fab-ripple"></div>
      </button>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button 
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Shop;