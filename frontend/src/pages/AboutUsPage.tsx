// frontend/src/pages/AboutUsPage.tsx
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-selenza-bright-red mb-6">
        Nosotros (SELENZA)
      </h1>
      <p className="text-selenza-medium-gray">
        Información sobre la empresa, misión, visión, valores y el equipo.
      </p>
      {/* Placeholder for company story, team, values etc. */}
      <div className="mt-8 p-8 bg-selenza-dark-gray rounded-lg shadow">
        <p className="text-center text-selenza-white">
          [Contenedor para la Historia de la Compañía, Misión, Visión, Valores]
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
