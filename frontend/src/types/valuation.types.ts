export interface ValuationRequest {
    fullName: string;
    email: string;
    phone: string;
    brand: string;
    model: string;
    year: number | string; // Allow string for input, convert to number on submit
    mileage: number | string;
    version?: string; // e.g., "LTZ", "Sport"
    color?: string;
    conditionNotes?: string; // Any specific notes about the car's condition
    // We might add image uploads later for this
  }