import React, { useEffect, useState, useCallback } from 'react';
import VehicleCard from '../components/vehicle/VehicleCard';
import type { Vehicle } from '../types/vehicles.types';
import type { VehicleFilters } from '../types/vehicles.types';
import * as vehicleService from '../services/vehicleService';

// Basic Pagination State
interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalVehicles: number;
  limit: number;
}

const InventoryPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalVehicles: 0,
    limit: 12, // Should match the default in vehicleService or be configurable
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add state for filters if you implement a filter UI
  // const [activeFilters, setActiveFilters] = useState<Omit<VehicleFilters, 'limit' | 'offset'>>({ status: 'available' });

  const fetchVehiclesData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pagination.limit;
      
      // Pass current filters (if any) and pagination parameters
      const data = await vehicleService.getAllVehicles(
        { status: 'available' }, // Example: Pass other filters from activeFilters state here
        pagination.limit,
        offset
      );
      
      setVehicles(data.vehicles);
      setPagination(prev => ({
        ...prev,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalVehicles: data.totalVehicles,
      }));
      setError(null);
    } catch (err) {
      setError('Failed to load vehicles. Please try again later.');
      console.error(err);
      // Optionally clear vehicles if fetch fails
      // setVehicles([]); 
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]); // Add activeFilters to dependency array if it's used

  useEffect(() => {
    fetchVehiclesData(1); // Fetch first page on initial load or when filters change
  }, [fetchVehiclesData]); // Re-run if fetchVehiclesData changes (due to filters or limit)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchVehiclesData(newPage);
    }
  };

  if (loading && vehicles.length === 0) { // Show loading only on initial load
    return <PageLayout><div className="text-center py-10">Loading vehicles...</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div className="text-center py-10 text-red-500">{error}</div></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Inventory</h1>
        
        {/* Placeholder for Filters UI - You would update activeFilters state from here */}
        {/* <div className="mb-8 p-4 bg-gray-100 rounded-lg"> ... </div> */}

        {vehicles.length === 0 && !loading && (
          <div className="text-center py-10">No vehicles found matching your criteria.</div>
        )}

        {vehicles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {/* Basic Pagination UI */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1 || loading}
              className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages || loading}
              className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default InventoryPage;
