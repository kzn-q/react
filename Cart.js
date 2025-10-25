// Cart.js - Premium Luxury Fashion Cart (Simplified Version)
import React, { useState, useEffect } from "react";
import "./Cart.css";

// SVG Icons as React components
const ShoppingBagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18"></path>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState([]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      loadSuggestedItems();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, cartItems]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const loadSuggestedItems = () => {
    const suggestions = [
      { 
        id: 's1', 
        name: 'Silk Scarf', 
        price: 89.99, 
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150',
        isPremium: true
      },
      { 
        id: 's2', 
        name: 'Leather Gloves', 
        price: 65.99, 
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150' 
      },
      { 
        id: 's3', 
        name: 'Designer Sunglasses', 
        price: 199.99, 
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150',
        isPremium: true
      }
    ];
    setSuggestedItems(suggestions);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCheckingOut(false);
    onCheckout();
  };

  const addSuggestedItem = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      onUpdateQuantity(existingItem, existingItem.quantity + 1);
    } else {
      console.log('Add suggested item:', item);
      // In real app, you'd dispatch an action to add to cart
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`premium-cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div 
        className={`premium-cart-sidebar ${isOpen ? 'active' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Header */}
        <div className="premium-cart-header">
          <div className="cart-title-section-premium">
            <div className="cart-icon-premium">
              <ShoppingBagIcon />
            </div>
            <div className="cart-title-content">
              <h2 className="premium-cart-title">Shopping Bag</h2>
              <div className="cart-count-premium">
                {getTotalItems()} {getTotalItems() === 1 ? 'luxury item' : 'luxury items'}
              </div>
            </div>
          </div>
          <button className="premium-cart-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Premium Content */}
        <div className="premium-cart-content">
          {cartItems.length === 0 ? (
            <div className="premium-empty-cart">
              <div className="empty-cart-animation-premium">
                <div className="luxury-bag-icon">
                  <ShoppingBagIcon />
                </div>
                <div className="floating-luxury-items">
                  <div className="floating-luxury-item">👑</div>
                  <div className="floating-luxury-item">💎</div>
                  <div className="floating-luxury-item">✨</div>
                </div>
              </div>
              <h3 className="empty-title-premium">Your Luxury Bag is Empty</h3>
              <p className="empty-subtitle-premium">Discover our exclusive collection and add premium items to your bag</p>
              <button className="premium-explore-btn" onClick={onClose}>
                Explore Collections
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items with Enhanced Styling */}
              <div className="premium-cart-items-scroll">
                <div className="premium-cart-items">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`} 
                      className="premium-cart-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="cart-item-glow-premium"></div>
                      
                      <div className="premium-cart-item-image">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="premium-quantity-badge">{item.quantity}</div>
                        {item.isPremium && (
                          <div className="premium-item-badge">Premium</div>
                        )}
                      </div>
                      
                      <div className="premium-cart-item-details">
                        <div className="premium-item-header">
                          <div className="item-title-section">
                            <h4 className="premium-cart-item-name">{item.name}</h4>
                            {item.isPremium && (
                              <span className="premium-indicator">✨</span>
                            )}
                          </div>
                          <button 
                            className="premium-remove-item-btn"
                            onClick={() => onRemoveItem(item)}
                            title="Remove item"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        
                        <p className="premium-cart-item-description">
                          {item.description || "Premium quality luxury item crafted with excellence"}
                        </p>
                        
                        {(item.size || item.color) && (
                          <div className="premium-item-variants">
                            {item.size && (
                              <span className="premium-variant-tag">Size: {item.size}</span>
                            )}
                            {item.color && (
                              <span className="premium-variant-tag">Color: {item.color}</span>
                            )}
                          </div>
                        )}
                        
                        <div className="premium-cart-item-controls">
                          <div className="premium-quantity-section">
                            <span className="premium-quantity-label">Quantity</span>
                            <div className="premium-quantity-controls">
                              <button 
                                className="premium-quantity-btn decrease"
                                onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon />
                              </button>
                              <span className="premium-quantity-display">{item.quantity}</span>
                              <button 
                                className="premium-quantity-btn increase"
                                onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                              >
                                <PlusIcon />
                              </button>
                            </div>
                          </div>
                          
                          <div className="premium-price-section">
                            <div className="premium-item-price">${item.price}</div>
                            <div className="premium-item-total">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium Suggested Items */}
                {suggestedItems.length > 0 && (
                  <div className="premium-suggested-items">
                    <div className="suggested-header-premium">
                      <h4 className="suggested-title-premium">Complete Your Look</h4>
                      <div className="suggested-subtitle">Premium accessories you'll love</div>
                    </div>
                    <div className="premium-suggested-grid">
                      {suggestedItems.map((item) => (
                        <div key={item.id} className="premium-suggested-item">
                          <div className="premium-suggested-image">
                            <img src={item.imageUrl} alt={item.name} />
                            {item.isPremium && (
                              <div className="suggested-premium-badge">Premium</div>
                            )}
                          </div>
                          <div className="premium-suggested-details">
                            <h5 className="suggested-item-name">{item.name}</h5>
                            <p className="premium-suggested-price">${item.price}</p>
                            <button 
                              className="premium-add-suggested-btn"
                              onClick={() => addSuggestedItem(item)}
                            >
                              <PlusIcon />
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Summary */}
              <div className="premium-cart-summary">
                {/* Simplified Pricing Breakdown */}
                <div className="premium-pricing-breakdown">
                  <div className="premium-price-row total">
                    <span className="premium-price-label">Total Amount</span>
                    <span className="premium-price-value total-amount">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Premium Action Buttons */}
                <div className="premium-cart-actions">
                  <button 
                    className={`premium-checkout-btn ${isCheckingOut ? 'processing' : ''}`}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="premium-spinner"></div>
                        Processing Your Luxury Order...
                      </>
                    ) : (
                      <>
                        <LockIcon />
                        Secure Checkout
                        <span className="checkout-total">${total.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                  
                  <button className="premium-continue-shopping-btn" onClick={onClose}>
                    Continue Luxury Shopping
                  </button>
                  
                  {/* Premium Trust Badges */}
                  <div className="premium-trust-badges">
                    <div className="premium-trust-badge">
                      <ShieldIcon />
                      <span>Secure Payment</span>
                    </div>
                    <div className="premium-trust-badge">
                      <span className="trust-icon">🚚</span>
                      <span>Free Shipping</span>
                    </div>
                    <div className="premium-trust-badge">
                      <span className="trust-icon">↩️</span>
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;