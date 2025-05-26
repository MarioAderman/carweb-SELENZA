import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Vehicle } from '../types/vehicles.types';
import { getVehicles } from '../services/vehicleService'; // To fetch featured vehicles
import VehicleCard from '../components/vehicle/VehicleCard'; // Re-use for featured vehicles

const heroBackgroundImageUrl = '../assets/images/selenza-logo.jpg';

const HomePage: React.FC = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setIsLoadingFeatured(true);
      try {
        // Fetch a few vehicles to feature, e.g., the first 4 available
        // Later, you might have a specific endpoint or query param for "featured"
        const allVehicles = await getVehicles({ status: 'available', limit: 4 }); // Assuming backend supports limit
        setFeaturedVehicles(allVehicles);
      } catch (error) {
        console.error("Error fetching featured vehicles:", error);
        // Gracefully handle error, maybe show nothing or a message
      } finally {
        setIsLoadingFeatured(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="text-selenza-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32 md:py-48 text-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroBackgroundImageUrl}')` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Calidad y Confianza en Seminuevos
          </h1>
          <p className="text-lg sm:text-xl text-selenza-medium-gray mb-10 max-w-2xl mx-auto">
            Descubre una selección premium de vehículos inspeccionados y listos para ti. En SELENZA, tu satisfacción es nuestra prioridad.
          </p>
          <Link
            to="/inventory"
            className="bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-bold py-3 px-8 rounded-md text-lg transition-colors duration-150 ease-in-out"
          >
            Ver Inventario
          </Link>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      {featuredVehicles.length > 0 && (
        <section className="py-16 md:py-24 bg-selenza-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-selenza-white mb-4">
              Vehículos Destacados
            </h2>
            <p className="text-center text-selenza-medium-gray mb-12 max-w-xl mx-auto">
              Una muestra de nuestro inventario cuidadosamente seleccionado.
            </p>
            {isLoadingFeatured ? (
              <div className="text-center text-selenza-bright-red">Cargando destacados...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link
                to="/inventory"
                className="border border-selenza-bright-red text-selenza-bright-red hover:bg-selenza-bright-red hover:text-selenza-white font-semibold py-3 px-8 rounded-md transition-colors duration-150 ease-in-out"
              >
                Ver Todo el Inventario
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose SELENZA? Section */}
      <section className="py-16 md:py-24 bg-selenza-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-selenza-white mb-12">
            ¿Por Qué Elegir SELENZA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              {/* Placeholder for Icon */}
              <div className="text-selenza-bright-red text-5xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-selenza-white mb-2">Inspección Rigurosa</h3>
              <p className="text-selenza-medium-gray">
                Cada vehículo pasa por un control de calidad exhaustivo para tu tranquilidad.
              </p>
            </div>
            <div className="p-6">
              {/* Placeholder for Icon */}
              <div className="text-selenza-bright-red text-5xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-selenza-white mb-2">Precios Justos y Transparentes</h3>
              <p className="text-selenza-medium-gray">
                Ofrecemos valor real sin sorpresas ni costos ocultos.
              </p>
            </div>
            <div className="p-6">
              {/* Placeholder for Icon */}
              <div className="text-selenza-bright-red text-5xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-selenza-white mb-2">Atención Personalizada</h3>
              <p className="text-selenza-medium-gray">
                Te acompañamos en cada paso para encontrar el auto perfecto para ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-selenza-dark-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-selenza-white mb-4">
            Facilitamos Tu Compra
          </h2>
          <p className="text-selenza-medium-gray mb-10 max-w-xl mx-auto">
            Además de vehículos excepcionales, ofrecemos servicios para hacer tu experiencia aún mejor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="p-6 bg-selenza-black rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-selenza-bright-red mb-2">Financiamiento</h3>
              <p className="text-selenza-medium-gray text-sm">Opciones flexibles adaptadas a tus necesidades.</p>
            </div>
            <div className="p-6 bg-selenza-black rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-selenza-bright-red mb-2">Gestoría y Trámites</h3>
              <p className="text-selenza-medium-gray text-sm">Nos encargamos del papeleo para que tú no tengas que hacerlo.</p>
            </div>
            <div className="p-6 bg-selenza-black rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-selenza-bright-red mb-2">Seguros</h3>
              <p className="text-selenza-medium-gray text-sm">Protege tu inversión con las mejores coberturas.</p>
            </div>
          </div>
          <Link
            to="/services"
            className="border border-selenza-bright-red text-selenza-bright-red hover:bg-selenza-bright-red hover:text-selenza-white font-semibold py-3 px-8 rounded-md transition-colors duration-150 ease-in-out"
          >
            Conoce Nuestros Servicios
          </Link>
        </div>
      </section>

      {/* Sell Your Car Teaser Section */}
      <section className="py-16 md:py-24 bg-selenza-black">
        <div className="container mx-auto px-4">
          <div className="bg-selenza-dark-gray p-8 md:p-12 rounded-lg shadow-xl text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-selenza-white mb-3">
                ¿Quieres Vender Tu Auto?
              </h2>
              <p className="text-selenza-medium-gray mb-6 md:mb-0 max-w-lg">
                En SELENZA te ofrecemos una valuación justa y un proceso rápido y seguro. ¡Contáctanos!
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
              <Link
                to="/sell-car"
                className="bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-bold py-3 px-8 rounded-md text-lg transition-colors duration-150 ease-in-out"
              >
                Valúa Tu Auto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;