export interface VehicleImage {
    image_id: number;
    image_url: string;
    s3_key: string;
    s3_bucket: string;
    alt_text?: string | null;
    is_primary?: boolean;
    uploaded_at: string;
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
    main_image_url?: string | null;
    images?: VehicleImage[]; // Optional: if you fetch images along with vehicles
  }

  export interface VehicleFilters {
    status?: string;
    brand?: string;
    model?: string;
    year_min?: number;
    year_max?: number;
    price_min?: number;
    price_max?: number;
    // Add other potential filters
    limit?: number;   // <-- Add limit
    offset?: number;  // <-- Add offset
  }
  
  export interface PaginatedVehiclesResponse {
    vehicles: Vehicle[];
    totalVehicles: number;
    currentPage: number;
    totalPages: number;
  }
