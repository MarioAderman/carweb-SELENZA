import apiClient from './apiClient';
import type { Vehicle } from '../types/vehicles.types';
import type { VehicleFilters } from '../types/vehicles.types';
import type { PaginatedVehiclesResponse } from '../types/vehicles.types';

export const getAllVehicles = async (
  // Filters can include status, brand, etc., but not limit/offset here as they are separate params
  filters?: Omit<VehicleFilters, 'limit' | 'offset'>,
  limit: number = 12, // Default limit, matches backend and InventoryPage
  offset: number = 0  // Default offset
): Promise<PaginatedVehiclesResponse> => {
  try {
    // Construct the params object to send to the API
    const params: VehicleFilters = { // VehicleFilters type can be used here as it includes limit/offset
      ...filters, // Spread any other filters like status, brand, etc.
      limit,
      offset,
    };

    // The API endpoint '/vehicles' is expected to return the PaginatedVehiclesResponse structure
    const response = await apiClient.get<PaginatedVehiclesResponse>('/vehicles', { params });
    return response.data; // This data will be { vehicles: [], totalVehicles: X, ... }
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error; // Rethrow to be handled by the calling component (e.g., InventoryPage)
  }
};

// Fetch a single vehicle by ID - this function remains largely the same
export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return response.data; // This data is a single Vehicle object (now with 'images' array)
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    throw error;
  }
};
