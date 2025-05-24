// frontend/src/components/vehicle/VehicleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Vehicle } from '../../types/vehicle.types';
import PlaceholderCarImage from '../../assets/images/selenza-logo.jpg'; // We'll add this

// Hardcoded placeholders
// import Creta from '../../../../backend/images/CRETA/C-1.jpg';

interface VehicleCardProps {
  vehicle: Vehicle;
}

// Helper to format currency (simple version)
const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  // Determine the primary image.
  // This logic might need adjustment based on how images are provided by your API.
  // For now, let's assume `vehicle.images` is an array and the first one is the primary,
  // or a direct `vehicle.imageUrl` property if your backend simplifies this.
  // Let's assume for now your backend provides a `cover_image_url` directly on the vehicle object
  // or you'll fetch it. If not, we'll use a placeholder.
  // const imageUrl = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].url : PlaceholderCarImage;
  // For now, let's assume a direct property or a placeholder if not available.
  // You might need to adjust this based on your actual API response for vehicles list.
  // Let's say your vehicles endpoint includes a `cover_image_url` for the card.
  const imageUrl = (vehicle as any).cover_image_url || PlaceholderCarImage;


  return (
    <div className="bg-selenza-black border border-selenza-dark-gray rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 ease-in-out hover:scale-105">
      <Link to={`/inventory/${vehicle.id}`} className="block">
        <img
          // src={imageUrl} // Use this once you have image URLs from your backend
          src={PlaceholderCarImage} // TEMPORARY: Replace with actual image logic
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-56 object-cover" // Adjust h-56 as needed
          onError={(e) => (e.currentTarget.src = PlaceholderCarImage)} // Fallback if image fails to load
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-selenza-white mb-2 truncate" title={`${vehicle.brand} ${vehicle.model}`}>
          <Link to={`/inventory/${vehicle.id}`} className="hover:text-selenza-bright-red">
            {vehicle.brand} {vehicle.model}
          </Link>
        </h3>
        <p className="text-selenza-medium-gray text-sm mb-1">{vehicle.year}</p>
        <p className="text-2xl font-bold text-selenza-bright-red mb-4">
          {formatPrice(vehicle.price)}
        </p>

        {/* Optional: A few key specs */}
        {vehicle.mileage !== null && (
          <p className="text-sm text-selenza-cool-gray mb-1">
            {vehicle.mileage.toLocaleString('es-MX')} km
          </p>
        )}
        {/* You can add more brief details here if desired */}

        <div className="mt-auto pt-4">
          <Link
            to={`/inventory/${vehicle.id}`}
            className="w-full block text-center bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 ease-in-out"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
