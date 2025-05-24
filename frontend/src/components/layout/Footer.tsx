// frontend/src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-selenza-black text-selenza-medium-gray border-t border-selenza-dark-gray">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-selenza-white mb-3">SELENZA Autos</h3>
            <p className="text-sm">
              Tu concesionario de confianza para autos seminuevos de calidad.
            </p>
            {/* Add address or more info if needed */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-selenza-white mb-3">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/inventory" className="hover:text-selenza-white transition-colors">Inventario</Link></li>
              <li><Link to="/sell-car" className="hover:text-selenza-white transition-colors">Vende tu Auto</Link></li>
              <li><Link to="/services" className="hover:text-selenza-white transition-colors">Servicios</Link></li>
              <li><Link to="/about-us" className="hover:text-selenza-white transition-colors">Nosotros</Link></li>
              {/* Add Privacy Policy, Terms links later */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-selenza-white mb-3">Contacto</h3>
            <p className="text-sm">
              {/* Email: info@selenza.com <br /> */}
              {/* Teléfono: +52 XXX XXX XXXX <br /> */}
              WhatsApp: <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer" className="text-selenza-bright-red hover:text-selenza-pure-red transition-colors">Chatea con nosotros</a>
            </p>
            {/* Social media icons can go here */}
          </div>
        </div>
        <div className="mt-8 border-t border-selenza-dark-gray pt-8 text-center text-sm">
          <p>&copy; {currentYear} SELENZA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;