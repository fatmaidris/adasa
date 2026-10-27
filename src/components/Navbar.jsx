import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Camera, Search, Menu, X, ArrowLeft } from 'lucide-react';
import data from '../data/adasa.json';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const siteInfo = data.siteInfo || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المدونة', path: '/blog' },
    { name: 'من نحن', path: '/about' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          <Link
            to="/"
            className="brand-group"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="عدسة - الصفحة الرئيسية"
          >
            <div className="brand-logo-frame">
              <Camera size={22} strokeWidth={2.2} />
              <div className="brand-logo-glow"></div>
            </div>
            <div className="brand-names">
              <span className="brand-title">{siteInfo.name || 'عدسة'}</span>
              <span className="brand-subtitle">{siteInfo.tagline || 'عالم التصوير الفوتوغرافي'}</span>
            </div>
          </Link>

          <nav className="desktop-nav-capsule" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-capsule-link ${isActive ? 'active' : ''}`}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="header-left-actions">
            <button
              type="button"
              className="search-icon-btn"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="فتح البحث"
              title="بحث سريع"
            >
              <Search size={18} />
            </button>

            <Link to="/blog" className="header-cta-btn">
              <span>ابدأ القراءة</span>
              <ArrowLeft size={16} className="cta-arrow" />
            </Link>

            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} className="search-dialog-form">
              <Search size={20} className="search-dialog-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في 28 مقالاً... (اضغط Enter)"
                autoFocus
                className="search-dialog-input"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="search-dialog-close"
                aria-label="إغلاق البحث"
              >
                <X size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-top">
              <div className="brand-group">
                <div className="brand-logo-frame">
                  <Camera size={20} />
                </div>
                <span className="brand-title">{siteInfo.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-close-btn"
                aria-label="إغلاق القائمة"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mobile-search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-submit" aria-label="بحث">
                <Search size={18} />
              </button>
            </form>

            <nav className="mobile-nav-list">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  end={link.path === '/'}
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mobile-drawer-cta">
              <Link
                to="/blog"
                className="header-cta-btn w-full text-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>ابدأ القراءة</span>
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
