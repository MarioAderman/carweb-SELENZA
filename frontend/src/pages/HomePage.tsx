// frontend/src/pages/HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Section 1: Full width hero */}
      <div className="bg-selenza-black text-selenza-white py-20 text-center">
        <h1 className="text-5xl font-bold">Hero Title Full Width</h1>
      </div>

      {/* Section 2: Constrained content */}
      <div className="container mx-auto px-4 py-8"> {/* Add container here for this section */}
        <h2 className="text-3xl font-bold text-selenza-bright-red">Contenido Principal</h2>
        <p className="text-selenza-medium-gray mt-4">
          ¡Bienvenido al sitio! Aquí se mostrará el inventario y más información.
        </p>
      </div>
    </div>
  );
};

export default HomePage;