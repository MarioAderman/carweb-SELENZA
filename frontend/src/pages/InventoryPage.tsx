// frontend/src/pages/InventoryPage.tsx
import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService';
import type { Vehicle } from '../types/vehicles.types';
import VehicleCard from '../components/vehicle/VehicleCard';
// import VehicleFilterControls from '../../components/vehicle/VehicleFilterControls'; // For later

const InventoryPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [filters, setFilters] = useState({}); // For later

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const data = await getVehicles(filters); // Pass filters when implemented
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        console.error(err);
        setError('No pudimos cargar los vehículos. Intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []); // Add 'filters' to dependency array when implemented

  return (
    <div>
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-bold text-selenza-white mb-2">
          Nuestro Inventario
        </h1>
        <p className="text-lg text-selenza-medium-gray">
          Explora nuestra selección de vehículos seminuevos de calidad.
        </p>
      </div>

      {/* Filters section - Placeholder for now */}
      {/* <VehicleFilterControls onFilterChange={setFilters} /> */}
      <div className="mb-8 p-4 bg-selenza-black border border-selenza-dark-gray rounded-lg">
        <p className="text-selenza-cool-gray">Controles de Filtro (Próximamente)</p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          {/* You can use a more sophisticated spinner component later */}
          <p className="text-2xl text-selenza-bright-red animate-pulse">Cargando vehículos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-xl text-selenza-pure-red">{error}</p>
          {/* Optionally, add a retry button */}
        </div>
      )}

      {!isLoading && !error && vehicles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-selenza-medium-gray">
            No hay vehículos disponibles que coincidan con tu búsqueda en este momento.
          </p>
        </div>
      )}

      {!isLoading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
