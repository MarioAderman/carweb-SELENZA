// frontend/src/pages/VehicleDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVehicleById } from '../services/vehicleService';
import type { Vehicle, VehicleImage } from '../types/vehicles.types';
import PlaceholderCarImage from '../assets/images/selenza-logo.jpg'; // Fallback

// Helper to format currency (can be moved to a utils file later)
const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

const VehicleDetailPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<VehicleImage | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setError('ID de vehículo no proporcionado.');
      setIsLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVehicleById(vehicleId);
        setVehicle(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]); // Select the first image by default
        }
      } catch (err) {
        console.error(err);
        setError('No pudimos cargar los detalles del vehículo. Intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-selenza-bright-red animate-pulse">Cargando detalles del vehículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-selenza-pure-red">{error}</p>
        <Link to="/inventory" className="mt-4 inline-block text-selenza-bright-red hover:underline">
          Volver al Inventario
        </Link>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-selenza-medium-gray">Vehículo no encontrado.</p>
        <Link to="/inventory" className="mt-4 inline-block text-selenza-bright-red hover:underline">
          Volver al Inventario
        </Link>
      </div>
    );
  }

  const mainImageUrl = selectedImage?.image_url || (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].image_url : PlaceholderCarImage);

  return (
    <div className="container mx-auto px-4 py-8 text-selenza-white">
      {/* Back to Inventory Link */}
      <div className="mb-6">
        <Link to="/inventory" className="text-selenza-bright-red hover:text-selenza-pure-red transition-colors">
          &larr; Volver al Inventario
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Section */}
        <div>
          <div className="mb-4 bg-selenza-black rounded-lg overflow-hidden shadow-xl">
            <img
              src={mainImageUrl}
              alt={`${vehicle.brand} ${vehicle.model} - Vista Principal`}
              className="w-full h-auto max-h-[500px] object-contain aspect-video" // aspect-video or aspect-square
              onError={(e) => (e.currentTarget.src = PlaceholderCarImage)}
            />
          </div>
          {vehicle.images && vehicle.images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {vehicle.images.map((img: VehicleImage) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded overflow-hidden border-2 transition-all
                    ${selectedImage?.id === img.id ? 'border-selenza-bright-red' : 'border-transparent hover:border-selenza-cool-gray'}`}
                >
                  <img
                    src={img.image_url}
                    alt={`${vehicle.brand} ${vehicle.model} - Miniatura ${img.id}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => (e.currentTarget.src = PlaceholderCarImage)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle Details Section */}
        <div className="bg-selenza-black p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-selenza-white mb-2">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-xl text-selenza-medium-gray mb-4">{vehicle.year}</p>

          <p className="text-4xl font-extrabold text-selenza-bright-red mb-6">
            {formatPrice(vehicle.price)}
          </p>

          <div className="mb-6">
            <a
              href={`https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(vehicle.brand || '')}%20${encodeURIComponent(vehicle.model || '')}%20${vehicle.year || ''}%20(ID:%20${vehicle.id}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-selenza-pure-red hover:bg-selenza-bright-red text-selenza-white font-bold py-3 px-6 rounded-md transition-colors duration-150 ease-in-out text-lg"
            >
              Consultar por WhatsApp
            </a>
          </div>
          
          <div className="space-y-3 text-selenza-medium-gray">
            {vehicle.mileage !== null && (
              <p><strong className="text-selenza-cool-gray">Kilometraje:</strong> {vehicle.mileage.toLocaleString('es-MX')} km</p>
            )}
            {vehicle.description && (
              <div>
                <h4 className="text-lg font-semibold text-selenza-cool-gray mb-1">Descripción:</h4>
                <p className="whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}
            {vehicle.outer_equipment && (
              <div>
                <h4 className="text-lg font-semibold text-selenza-cool-gray mb-1">Equipamiento Exterior:</h4>
                <p className="whitespace-pre-line">{vehicle.outer_equipment}</p>
              </div>
            )}
            {vehicle.inner_equipment && (
              <div>
                <h4 className="text-lg font-semibold text-selenza-cool-gray mb-1">Equipamiento Interior:</h4>
                <p className="whitespace-pre-line">{vehicle.inner_equipment}</p>
              </div>
            )}
             <p><strong className="text-selenza-cool-gray">Estatus:</strong> <span className={`capitalize font-semibold ${vehicle.status === 'available' ? 'text-green-400' : 'text-red-400'}`}>{vehicle.status}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
