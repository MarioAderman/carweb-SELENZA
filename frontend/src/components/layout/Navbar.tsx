// frontend/src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SelenzaLogo from '../../assets/images/selenza-logo.jpg';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if page is scrolled more than 10px, for example
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Common class for NavLink active state
  const activeClassName = "text-selenza-bright-red border-b-2 border-selenza-bright-red";
  const inactiveClassName = "text-selenza-white hover:text-selenza-bright-red transition-colors duration-150";

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeClassName : inactiveClassName;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 text-lg ${isActive ? 
      'text-selenza-bright-red font-semibold bg-selenza-dark-gray' 
      : 'text-selenza-white hover:bg-selenza-dark-gray hover:text-selenza-bright-red'} transition-colors duration-150`;
  
  const baseNavClasses = "sticky top-0 z-50 transition-all duration-300 ease-in-out";

  const scrolledNavClasses = "bg-selenza-black/80 backdrop-blur-md shadow-xl";

  const topNavClasses = "bg-selenza-black shadow-lg";

  return (
    <nav className={`${baseNavClasses} ${isScrolled ? scrolledNavClasses : topNavClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center">
              <img
                className="h-10 w-auto sm:h-12"
                src={SelenzaLogo}
                alt="SELENZA Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            <NavLink to="/inventory" className={navLinkClasses}>
              Compra un Auto
            </NavLink>
            <NavLink to="/sell-car" className={navLinkClasses}>
              Vende tu Auto
            </NavLink>
            <NavLink to="/services" className={navLinkClasses}>
              Servicios
            </NavLink>
            <NavLink to="/about-us" className={navLinkClasses}>
              Nosotros
            </NavLink>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-selenza-medium-gray hover:text-selenza-white hover:bg-selenza-dark-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-selenza-bright-red"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {/* Apply similar background/blur effect to mobile menu if it's open and page is scrolled */}
      <div
        className={`
          ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden
          border-t border-selenza-dark-gray/50
          ${isScrolled ? 'bg-selenza-black/80 backdrop-blur-md' : 'bg-selenza-black'}
          transition-all duration-300 ease-in-out
        `}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/inventory" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Compra un Auto
          </NavLink>
          <NavLink to="/sell-car" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Vende tu Auto
          </NavLink>
          <NavLink to="/services" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Servicios
          </NavLink>
          <NavLink to="/about-us" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Nosotros
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;