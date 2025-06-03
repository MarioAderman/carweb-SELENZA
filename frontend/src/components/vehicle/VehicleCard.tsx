import React from 'react';
import { Link } from 'react-router-dom';
import type { Vehicle } from '../../types/vehicles.types'; // Ensure this type is updated or compatible

// It's good practice to ensure your Vehicle type reflects the data accurately.
// If 'main_image_url' is now a direct property, your Vehicle type should include it.
// For example, in src/types/vehicleTypes.ts:
// export interface Vehicle {
//   id: number;
//   brand: string;
//   model: string;
//   year: number;
//   price: string | number; // Or just number if always stored as number
//   mileage?: number | null;
//   description?: string;
//  ... other vehicle fields
//   main_image_url?: string | null; // <-- Add this
//   images?: any[]; // Keep this if getVehicleById still returns a full images array
// }


interface VehicleCardProps {
  vehicle: Vehicle; // This Vehicle type should ideally include main_image_url
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const placeholderImage = "/images/car-placeholder.png";

  // Use the new main_image_url property directly.
  // Fallback to placeholder if main_image_url is not available.
  const imageUrl = vehicle.main_image_url || placeholderImage;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <Link to={`/inventory/${vehicle.id}`} className="block">
        <div className="w-full h-56 bg-gray-200"> {/* Image container */}
          <img
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover" // Ensures image covers the area, maintains aspect ratio
            onError={(e) => {
              // Fallback to placeholder if the image fails to load
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">{vehicle.year}</p>
          <p className="text-lg font-bold text-selenza-blue mt-2">
            ${Number(vehicle.price).toLocaleString()}
          </p>
          {vehicle.mileage != null && ( // Check for null or undefined explicitly for mileage
            <p className="text-gray-500 text-xs mt-1">{Number(vehicle.mileage).toLocaleString()} km</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VehicleCard;
