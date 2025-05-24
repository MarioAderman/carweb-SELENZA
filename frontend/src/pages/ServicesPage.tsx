// frontend/src/pages/ServicesPage.tsx
import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-selenza-bright-red mb-6">
        Servicios Adicionales
      </h1>
      <p className="text-selenza-medium-gray">
        Detalles sobre financiamiento, seguros, gestoría, etc.
      </p>
      {/* Placeholder for list/cards of additional services */}
      <div className="mt-8 p-8 bg-selenza-dark-gray rounded-lg shadow">
        <p className="text-center text-selenza-white">
          [Contenedor para la Descripción de Servicios Adicionales]
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;
