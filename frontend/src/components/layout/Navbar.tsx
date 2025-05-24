// frontend/src/components/layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// import SelenzaLogo from '@/assets/images/selenza-logo.png'; // Assuming you'll add a logo

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Inicio', path: '/home' },
    { name: 'Inventario', path: '/inventory' }, // Compra un auto
    { name: 'Vende tu Auto', path: '/sell-car' },
    { name: 'Servicios', path: '/services' },
    { name: 'Nosotros', path: '/about-us' },
  ];

  return (
    <nav className="bg-selenza-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/home">
              {/* <img className="h-12 w-auto" src={SelenzaLogo} alt="SELENZA" /> */}
              <span className="text-3xl font-bold text-selenza-white">SELENZA</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-selenza-medium-gray hover:bg-selenza-dark-gray hover:text-selenza-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - to be implemented */}
            <button className="text-selenza-medium-gray hover:text-selenza-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on state - to be implemented */}
      {/* <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-selenza-medium-gray hover:bg-selenza-dark-gray hover:text-selenza-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;