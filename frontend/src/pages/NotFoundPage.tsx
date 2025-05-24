// frontend/src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-selenza-pure-red mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-selenza-white mb-6">
        Página No Encontrada
      </h2>
      <p className="text-selenza-medium-gray mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/home"
        className="bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-bold py-3 px-6 rounded-md transition-colors duration-150 ease-in-out"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
