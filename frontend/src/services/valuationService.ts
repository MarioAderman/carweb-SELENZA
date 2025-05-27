import apiClient from './apiClient';
import type { ValuationRequest } from '../types/valuation.types';
import { AxiosError } from 'axios';

export interface ValuationResponse {
  message: string;
  id?: string; // Optional: if the backend returns an ID for the request
}

interface ApiErrorData {
    message: string;
  }

  export const submitValuationRequest = async (
    data: ValuationRequest
  ): Promise<ValuationResponse> => {
    try {
      const payload = {
        ...data,
        year: typeof data.year === 'string' ? parseInt(data.year, 10) : data.year,
        mileage: typeof data.mileage === 'string' ? parseInt(data.mileage, 10) : data.mileage,
      };
      const response = await apiClient.post<ValuationResponse>('/valuations', payload);
      return response.data;
    } catch (error) {
      console.error('Error submitting valuation request:', error);
  
      // Check if it's an AxiosError and has the expected structure
      if (error instanceof AxiosError && error.response && error.response.data) {
        // Now TypeScript knows error.response exists
        const errorData = error.response.data as ApiErrorData; // You might need to cast data
        if (errorData && typeof errorData.message === 'string') {
          throw new Error(errorData.message); // Throw a new error with the specific message
        }
        // Fallback if the structure isn't as expected but it's an Axios error
        throw new Error(error.message || 'Error en la respuesta del servidor.');
      }
      // Handle other types of errors or provide a generic message
      if (error instanceof Error) {
          throw new Error(error.message || 'Ocurrió un error inesperado.');
      }
      throw new Error('No se pudo enviar la solicitud de valuación. Intente más tarde.');
    }
  };
