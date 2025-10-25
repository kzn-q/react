// App.js
import React from "react";
import Shop from "./Shop";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <div className="header-content">
          <h1 className="app-title">LuxeShop</h1>
          <p className="app-subtitle">Curated Collection • Premium Quality • Fast Delivery</p>
        </div>
      </div>
      
      <main className="app-main">
        <Shop />
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LuxeShop</h4>
            <p>Your premium destination for quality products and exceptional shopping experience.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#shipping">Shipping Info</a>
              <a href="#returns">Returns</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Customer Care</h4>
            <div className="footer-links">
              <a href="#help">Help Center</a>
              <a href="#track">Track Order</a>
              <a href="#size">Size Guide</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#pinterest" aria-label="Pinterest">📌</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 LuxeShop. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;