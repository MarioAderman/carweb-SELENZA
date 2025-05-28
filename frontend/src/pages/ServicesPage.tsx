import React from 'react';
import { Link } from 'react-router-dom';
// You might want to import icons later, e.g., from react-icons
// import { FaCar, FaFileContract, FaShieldAlt } from 'react-icons/fa';

const ServicesPage: React.FC = () => {
  const serviceCardClass = "bg-selenza-dark-gray p-8 rounded-lg shadow-xl border border-selenza-cool-gray/50 transform hover:scale-105 transition-transform duration-300 ease-in-out";
  const serviceTitleClass = "text-2xl font-bold text-selenza-bright-red mb-4";
  const serviceDescriptionClass = "text-selenza-medium-gray leading-relaxed";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-selenza-white">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Nuestros Servicios Adicionales
        </h1>
        <p className="text-lg text-selenza-medium-gray max-w-2xl mx-auto">
          En SELENZA, no solo te ayudamos a encontrar tu auto ideal, sino que también te ofrecemos servicios complementarios para cuidar tu inversión y facilitar tus trámites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Detallado Automotriz Section */}
        <div className={serviceCardClass}>
          {/* Optional Icon Placeholder */}
          {/* <FaCar className="text-5xl text-selenza-bright-red mb-6 mx-auto md:mx-0" /> */}
          <div className="text-5xl text-selenza-bright-red mb-6 text-center md:text-left">✨</div> {/* Placeholder emoji icon */}
          <h2 className={serviceTitleClass}>Detallado Automotriz Profesional</h2>
          <p className={serviceDescriptionClass}>
            Mantén tu vehículo luciendo como nuevo con nuestro servicio de detallado automotriz. Ofrecemos una limpieza profunda y restauración estética para el interior y exterior de tu auto, utilizando productos de la más alta calidad.
          </p>
          <ul className="list-disc list-inside mt-4 text-selenza-light-gray space-y-1">
            <li>Lavado premium de carrocería.</li>
            <li>Descontaminación de pintura.</li>
            <li>Pulido y encerado para un brillo excepcional.</li>
            <li>Limpieza profunda de interiores (tapicería, alfombras, plásticos).</li>
            <li>Restauración de faros.</li>
            <li>Protección cerámica (opcional).</li>
          </ul>
        </div>

        {/* Gestoría Vehicular Section */}
        <div className={serviceCardClass}>
          {/* Optional Icon Placeholder */}
          {/* <FaFileContract className="text-5xl text-selenza-bright-red mb-6 mx-auto md:mx-0" /> */}
          <div className="text-5xl text-selenza-bright-red mb-6 text-center md:text-left">📄</div> {/* Placeholder emoji icon */}
          <h2 className={serviceTitleClass}>Gestoría Vehicular Integral</h2>
          <p className={serviceDescriptionClass}>
            Olvídate del papeleo complicado y déjanos ayudarte con todos los trámites de tu vehículo. Nuestro equipo de expertos se encarga de agilizar cada proceso para tu comodidad.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-selenza-white mb-3">Nuestros servicios de gestoría incluyen:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-selenza-light-gray mb-1">Altas y Bajas de Placas</h4>
                <p className="text-selenza-medium-gray text-sm">
                  Gestionamos el registro de placas para vehículos nuevos o usados, así como la baja de placas por venta o cambio de entidad.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-selenza-light-gray mb-1">Seguro Vehicular</h4>
                <p className="text-selenza-medium-gray text-sm">
                  Te asesoramos para encontrar la mejor cobertura de seguro para tu auto, trabajando con las principales aseguradoras del país para ofrecerte tarifas competitivas y planes a tu medida.
                  {/* <FaShieldAlt className="inline ml-2 text-selenza-bright-red" /> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action / Contact Info */}
      <div className="mt-16 md:mt-24 text-center bg-selenza-black p-8 rounded-lg shadow-xl border border-selenza-dark-gray">
        <h2 className="text-2xl md:text-3xl font-bold text-selenza-white mb-4">
          ¿Interesado en Nuestros Servicios?
        </h2>
        <p className="text-selenza-medium-gray mb-6 max-w-xl mx-auto">
          Contáctanos hoy mismo para obtener más información, agendar una cita o solicitar una cotización personalizada.
        </p>
        <a
          href="https://wa.me/YOUR_WHATSAPP_NUMBER" // Replace with your actual WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-bold py-3 px-8 rounded-md text-lg transition-colors duration-150 ease-in-out"
        >
          Contáctanos por WhatsApp
        </a>
        <p className="text-selenza-cool-gray mt-4 text-sm">
          O visita nuestra sección de <Link to="/about-us#contact" className="underline hover:text-selenza-bright-red">contacto</Link> para otras opciones.
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;
