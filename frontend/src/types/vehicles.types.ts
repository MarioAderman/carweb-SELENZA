// frontend/src/types/vehicle.types.ts

export interface VehicleImage {
    id: number;
    vehicle_id: number;
    url: string;
    sort_order: number;
  }
  
  export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number | null;
    price: string; // Comes as numeric(12,2) from DB, often stringified in JSON
    mileage: number | null;
    description: string | null;
    outer_equipment: string | null;
    inner_equipment: string | null;
    status: string; // e.g., 'available', 'sold'
    created_at: string; // Date string
    updated_at: string; // Date string
    images?: VehicleImage[]; // Optional: if you fetch images along with vehicles
  }
  
  // For a list response, if your API wraps it
  export interface VehiclesApiResponse {
    data: Vehicle[];
    // Add pagination info here if your API supports it
    // total?: number;
    // page?: number;
    // limit?: number;
  }
