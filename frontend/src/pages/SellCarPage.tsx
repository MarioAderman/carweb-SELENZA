import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { ValuationRequest } from '../types/valuation.types';
import { submitValuationRequest } from '../services/valuationService';
import type { ValuationResponse } from '../services/valuationService';

const SellCarPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValuationRequest>();

  const [submissionStatus, setSubmissionStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  const onSubmit: SubmitHandler<ValuationRequest> = async (data) => {
    setSubmissionStatus({ message: '', type: null });
    try {
      const response: ValuationResponse = await submitValuationRequest(data);
      setSubmissionStatus({ message: response.message || '¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.', type: 'success' });
      reset(); // Clear form fields
    } catch (error: any) {
      console.error(error);
      setSubmissionStatus({
        message: error.message || 'Error al enviar la solicitud. Por favor, inténtalo de nuevo.',
        type: 'error',
      });
    }
  };

  const inputClass = "mt-1 block w-full p-3 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md shadow-sm focus:ring-selenza-bright-red focus:border-selenza-bright-red text-selenza-white placeholder-selenza-medium-gray";
  const labelClass = "block text-sm font-medium text-selenza-light-gray";
  const errorClass = "mt-1 text-sm text-selenza-alert-red";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-selenza-white mb-6 text-center">
          Vende Tu Auto con SELENZA
        </h1>
        <p className="text-lg text-selenza-medium-gray mb-10 text-center">
          ¿Buscas vender tu auto de forma rápida, segura y al mejor precio? En SELENZA, te ofrecemos una experiencia transparente y sin complicaciones. Completa el siguiente formulario y uno de nuestros asesores se pondrá en contacto contigo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-selenza-black p-6 sm:p-8 rounded-lg shadow-xl border border-selenza-dark-gray">
          {/* Contact Information */}
          <h2 className="text-xl font-semibold text-selenza-white border-b border-selenza-dark-gray pb-2 mb-4">Información de Contacto</h2>
          <div>
            <label htmlFor="fullName" className={labelClass}>Nombre Completo</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', { required: 'Tu nombre completo es requerido' })}
              className={inputClass}
              placeholder="Ej: Juan Pérez"
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelClass}>Correo Electrónico</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Tu correo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido',
                  },
                })}
                className={inputClass}
                placeholder="Ej: juan.perez@ejemplo.com"
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Teléfono</label>
              <input
                id="phone"
                type="tel"
                {...register('phone', { required: 'Tu teléfono es requerido' })}
                className={inputClass}
                placeholder="Ej: 55 1234 5678"
              />
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>
          </div>

          {/* Vehicle Information */}
          <h2 className="text-xl font-semibold text-selenza-white border-b border-selenza-dark-gray pb-2 mb-4 pt-4">Información del Vehículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className={labelClass}>Marca</label>
              <input id="brand" type="text" {...register('brand', { required: 'La marca es requerida' })} className={inputClass} placeholder="Ej: Toyota"/>
              {errors.brand && <p className={errorClass}>{errors.brand.message}</p>}
            </div>
            <div>
              <label htmlFor="model" className={labelClass}>Modelo</label>
              <input id="model" type="text" {...register('model', { required: 'El modelo es requerido' })} className={inputClass} placeholder="Ej: Corolla"/>
              {errors.model && <p className={errorClass}>{errors.model.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className={labelClass}>Año</label>
              <input
                id="year"
                type="number"
                {...register('year', {
                  required: 'El año es requerido',
                  min: { value: 1980, message: 'Año inválido' },
                  max: { value: new Date().getFullYear() + 1, message: 'Año inválido' },
                })}
                className={inputClass}
                placeholder={`Ej: ${new Date().getFullYear() - 2}`}
              />
              {errors.year && <p className={errorClass}>{errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="mileage" className={labelClass}>Kilometraje</label>
              <input
                id="mileage"
                type="number"
                {...register('mileage', {
                  required: 'El kilometraje es requerido',
                  min: { value: 0, message: 'Kilometraje inválido' },
                })}
                className={inputClass}
                placeholder="Ej: 50000"
              />
              {errors.mileage && <p className={errorClass}>{errors.mileage.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="version" className={labelClass}>Versión (Opcional)</label>
              <input id="version" type="text" {...register('version')} className={inputClass} placeholder="Ej: XLE, LTZ"/>
            </div>
            <div>
              <label htmlFor="color" className={labelClass}>Color (Opcional)</label>
              <input id="color" type="text" {...register('color')} className={inputClass} placeholder="Ej: Rojo Cereza"/>
            </div>
          </div>

          <div>
            <label htmlFor="conditionNotes" className={labelClass}>
              Notas Adicionales sobre el Estado (Opcional)
            </label>
            <textarea
              id="conditionNotes"
              {...register('conditionNotes')}
              rows={4}
              className={inputClass}
              placeholder="Ej: Pequeño rayón en puerta trasera, llantas nuevas..."
            />
          </div>

          {/* Submission Status */}
          {submissionStatus.type && (
            <div
              className={`p-4 rounded-md text-sm ${
                submissionStatus.type === 'success'
                  ? 'bg-green-100 border border-green-400 text-green-700'
                  : 'bg-red-100 border border-red-400 text-red-700' // Use selenza-alert-red if defined
              }`}
            >
              {submissionStatus.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-selenza-white bg-selenza-bright-red hover:bg-selenza-pure-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-selenza-black focus:ring-selenza-bright-red disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Enviando Solicitud...' : 'Enviar Solicitud de Valuación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellCarPage;
