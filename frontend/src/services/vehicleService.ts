// frontend/src/services/vehicleService.ts
import apiClient from './apiClient';
import type { Vehicle } from '../types/vehicles.types';
import type { VehicleFilters } from '../components/vehicle/VehicleFilterControls';

// If your API returns a simple array of vehicles:
export const getVehicles = async (filters?: VehicleFilters): Promise<Vehicle[]> => {
  try {
    // If you implement filtering later, you can pass params here
    const response = await apiClient.get<Vehicle[]>('/vehicles', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error; // Rethrow to be handled by the component
  }
};

// If your API returns a structured response like VehiclesApiResponse:
/*
export const getVehicles = async (filters?: Record<string, any>): Promise<VehiclesApiResponse> => {
  try {
    const response = await apiClient.get<VehiclesApiResponse>('/vehicles', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};
*/

export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    throw error;
  }
};
