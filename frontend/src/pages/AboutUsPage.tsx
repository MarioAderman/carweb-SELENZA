import React from 'react';

// Placeholder for an image related to the dealership or team
// const aboutUsImageUrl = '/images/selenza-dealership-placeholder.jpg'; // Example path

const AboutUsPage: React.FC = () => {
  const sectionTitleClass = "text-3xl font-bold text-selenza-white mb-6";
  const paragraphClass = "text-selenza-medium-gray leading-relaxed mb-4";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-selenza-white">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Conoce a SELENZA
        </h1>
        <p className="text-lg text-selenza-medium-gray max-w-2xl mx-auto">
          Más que un concesionario, somos tus socios de confianza en el camino.
        </p>
      </div>

      {/* Our Story Section */}
      <section className="mb-12 md:mb-16">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h2 className={sectionTitleClass}>Nuestra Historia</h2>
          {/* Optional: Image related to the company
          <img
            src={aboutUsImageUrl}
            alt="Instalaciones de SELENZA"
            className="rounded-lg shadow-xl mb-8 w-full h-auto object-cover max-h-96"
          />
          */}
          <p className={paragraphClass}>
            SELENZA nació de la pasión por los automóviles y el deseo de transformar la experiencia de compra y venta de vehículos seminuevos en México. Fundada en [Año de Fundación], hemos crecido con el compromiso de ofrecer no solo autos de calidad, sino también un servicio transparente, honesto y centrado en las necesidades de nuestros clientes.
          </p>
          <p className={paragraphClass}>
            Creemos que adquirir un auto seminuevo debe ser una experiencia emocionante y segura. Por ello, cada vehículo en nuestro inventario es cuidadosamente seleccionado e inspeccionado para garantizar su óptimo estado. Nuestro equipo está formado por profesionales entusiastas y conocedores, listos para asesorarte en cada paso del proceso.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section (Optional, can be combined with Our Story) */}
      <section className="mb-12 md:mb-16 bg-selenza-dark-gray p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-selenza-bright-red mb-3">Nuestra Misión</h3>
            <p className={paragraphClass}>
              Facilitar a nuestros clientes el acceso a vehículos seminuevos de alta calidad a precios justos, brindando una experiencia de compra excepcional basada en la confianza, la transparencia y un servicio personalizado.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-selenza-bright-red mb-3">Nuestra Visión</h3>
            <p className={paragraphClass}>
              Ser el concesionario de vehículos seminuevos líder y de mayor confianza en la región, reconocidos por nuestra integridad, la calidad de nuestro inventario y la satisfacción total de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-12 md:mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={sectionTitleClass}>Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Confianza</h4>
              <p className="text-sm text-selenza-medium-gray">Actuamos con integridad y transparencia en todas nuestras interacciones.</p>
            </div>
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Calidad</h4>
              <p className="text-sm text-selenza-medium-gray">Ofrecemos solo vehículos que cumplen con nuestros altos estándares.</p>
            </div>
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Servicio al Cliente</h4>
              <p className="text-sm text-selenza-medium-gray">Nos esforzamos por superar las expectativas de nuestros clientes.</p>
            </div>
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Pasión</h4>
              <p className="text-sm text-selenza-medium-gray">Amamos los autos y compartimos ese entusiasmo contigo.</p>
            </div>
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Profesionalismo</h4>
              <p className="text-sm text-selenza-medium-gray">Nuestro equipo está capacitado para ofrecerte la mejor asesoría.</p>
            </div>
            <div className="p-6 bg-selenza-black border border-selenza-cool-gray/30 rounded-lg">
              <h4 className="text-xl font-semibold text-selenza-bright-red mb-2">Mejora Continua</h4>
              <p className="text-sm text-selenza-medium-gray">Buscamos siempre innovar y mejorar nuestros procesos y servicios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - This is where the #contact anchor leads */}
      <section id="contact" className="pt-10 bg-selenza-black p-8 md:p-12 rounded-lg shadow-xl border border-selenza-dark-gray">
        <h2 className={`${sectionTitleClass} text-center`}>Ponte en Contacto</h2>
        <p className={`${paragraphClass} text-center max-w-xl mx-auto`}>
          Nos encantaría escucharte. Si tienes alguna pregunta, deseas más información sobre nuestros vehículos o servicios, o simplemente quieres visitarnos, aquí te dejamos cómo encontrarnos.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-xl font-semibold text-selenza-white mb-3">Información de Contacto</h3>
            <p className="text-selenza-light-gray mb-2">
              <strong>Teléfono:</strong> <a href="tel:+52XXXXXXXXXX" className="hover:text-selenza-bright-red">+52 XXX XXX XXXX</a> {/* Replace */}
            </p>
            <p className="text-selenza-light-gray mb-2">
              <strong>WhatsApp:</strong> <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer" className="hover:text-selenza-bright-red">Envíanos un mensaje</a> {/* Replace */}
            </p>
            <p className="text-selenza-light-gray mb-2">
              <strong>Email:</strong> <a href="mailto:contacto@selenza.com.mx" className="hover:text-selenza-bright-red">contacto@selenza.com.mx</a> {/* Replace */}
            </p>
            <p className="text-selenza-light-gray mb-4">
              <strong>Dirección:</strong> [Tu Dirección Completa Aquí], [Ciudad], [Estado], México. {/* Replace */}
            </p>
            <h3 className="text-xl font-semibold text-selenza-white mb-3 mt-6">Horario de Atención</h3>
            <p className="text-selenza-light-gray">Lunes a Viernes: 9:00 AM - 7:00 PM</p>
            <p className="text-selenza-light-gray">Sábados: 10:00 AM - 3:00 PM</p>
            <p className="text-selenza-light-gray">Domingos: Cerrado (o con cita previa)</p>
          </div>
          {/* Optional: Google Maps Embed */}
          <div className="h-72 md:h-full bg-selenza-dark-gray rounded-lg overflow-hidden">
            {/* Replace with your Google Maps embed iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.163310906098!2d-99.16809288508267!3d19.43260778688179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d2f7f7f7f7%3A0x7f7f7f7f7f7f7f7f!2sPalacio%20de%20Bellas%20Artes!5e0!3m2!1ses-419!2smx!4v1620000000000!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border:0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Ubicación de SELENZA"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="text-xs text-selenza-cool-gray p-2">
              <a href="YOUR_GOOGLE_MAPS_LINK" target="_blank" rel="noopener noreferrer" className="hover:text-selenza-bright-red">Ver en Google Maps</a> {/* Replace */}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
