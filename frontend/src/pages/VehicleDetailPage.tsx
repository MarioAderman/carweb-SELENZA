// frontend/src/pages/VehicleDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const VehicleDetailPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  return (
    <div>
      <h1 className="text-3xl font-bold text-selenza-bright-red mb-6">
        Detalles del Vehículo
      </h1>
      <p className="text-selenza-medium-gray mb-4">
        Mostrando detalles para el vehículo con ID: {vehicleId}
      </p>
      {/* Placeholder for vehicle image gallery, specs, description, CTA */}
      <div className="mt-8 p-8 bg-selenza-dark-gray rounded-lg shadow">
        <p className="text-center text-selenza-white">
          [Contenedor para Galería de Imágenes, Especificaciones, Descripción y CTA de Contacto]
        </p>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
