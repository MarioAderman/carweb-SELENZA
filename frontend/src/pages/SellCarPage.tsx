// frontend/src/pages/SellCarPage.tsx
import React from 'react';

const SellCarPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-selenza-bright-red mb-6">
        Vende tu Auto con Nosotros
      </h1>
      <p className="text-selenza-medium-gray">
        Información sobre el proceso de venta, beneficios y un formulario de contacto/valuación.
      </p>
      {/* Placeholder for selling process info, valuation form, CTA */}
      <div className="mt-8 p-8 bg-selenza-dark-gray rounded-lg shadow">
        <p className="text-center text-selenza-white">
          [Contenedor para Información del Proceso, Formulario de Valuación/Contacto]
        </p>
      </div>
    </div>
  );
};

export default SellCarPage;
