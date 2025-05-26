import React, { useEffect, useState, useCallback } from 'react';
import { getVehicles } from '../services/vehicleService';
import type { Vehicle } from '../types/vehicles.types';
import VehicleCard from '../components/vehicle/VehicleCard';
import VehicleFilterControls from '../components/vehicle/VehicleFilterControls';
import type { VehicleFilters } from '../components/vehicle/VehicleFilterControls';


const InventoryPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VehicleFilters>({});

  const fetchVehicles = useCallback(async (currentFilters: VehicleFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching vehicles with filters:", currentFilters); // For debugging
      const data = await getVehicles(currentFilters);
      setVehicles(data);
    } catch (err) {
      console.error(err);
      setError('No pudimos cargar los vehículos. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles(filters); // Fetch initially and when filters change
  }, [filters, fetchVehicles]);

  const handleFilterChange = useCallback((newFilters: VehicleFilters) => {
    setFilters(newFilters);
  }, []);

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

      {/* Filters section */}
      <VehicleFilterControls onFilterChange={handleFilterChange} />

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-2xl text-selenza-bright-red animate-pulse">Cargando vehículos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-xl text-selenza-pure-red">{error}</p>
        </div>
      )}

      {!isLoading && !error && vehicles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-selenza-medium-gray">
            {Object.keys(filters).length > 0
              ? "No hay vehículos que coincidan con tus filtros."
              : "No hay vehículos disponibles en este momento."}
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
