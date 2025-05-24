// frontend/src/pages/LandingSurveyPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSurveySources, submitSurveyResponse } from '../services/surveyService';
import type { SurveySource } from '../types/survey.types';
import { useSurveyContext } from '../contexts/SurveyContext';

const LandingSurveyPage: React.FC = () => {
  const [sources, setSources] = useState<SurveySource[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setHasCompletedSurvey } = useSurveyContext();

  useEffect(() => {
    const fetchSources = async () => {
      try {
        setIsLoading(true);
        const data = await getSurveySources();
        setSources(data);
        setError(null);
      } catch (err) {
        setError('No pudimos cargar las opciones. Intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSources();
  }, []);

  const handleSubmit = async () => {
    if (selectedSourceId === null) {
      setError('Por favor, selecciona una opción.');
      return;
    }
    try {
      setIsLoading(true);
      // Here you might want to generate/retrieve a session_id if your backend requires it explicitly
      // For now, assuming backend handles session or it's not strictly needed for this anonymous survey
      await submitSurveyResponse({ source_id: selectedSourceId });
      setHasCompletedSurvey(true);
      navigate('/home'); // Navigate to the main homepage after submission
    } catch (err) {
      setError('Hubo un problema al enviar tu respuesta. Intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-selenza-black text-selenza-white p-6">
      <div className="bg-selenza-dark-gray p-8 md:p-12 rounded-lg shadow-2xl w-full max-w-lg text-center">
        {/* <img src={SelenzaLogo} alt="SELENZA" className="mx-auto mb-8 h-16" /> */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-selenza-white">
          ¡Bienvenido a SELENZA!
        </h1>
        <p className="mb-8 text-lg text-selenza-medium-gray">
          Nos gustaría saber, ¿cómo supiste de nosotros por primera vez?
        </p>

        {isLoading && !sources.length && <p className="text-selenza-bright-red">Cargando opciones...</p>}
        {error && <p className="text-selenza-pure-red mb-4">{error}</p>}

        <div className="space-y-4 mb-8">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => {
                setSelectedSourceId(source.id);
                if(error) setError(null); // Clear error on new selection
              }}
              className={`w-full text-left p-4 rounded-md transition-all duration-150 ease-in-out
                ${selectedSourceId === source.id
                  ? 'bg-selenza-bright-red text-selenza-white ring-2 ring-selenza-pure-red'
                  : 'bg-selenza-cool-gray hover:bg-selenza-medium-gray text-selenza-white'
                } focus:outline-none focus:ring-2 focus:ring-selenza-bright-red`}
            >
              {source.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || selectedSourceId === null}
          className="w-full bg-selenza-bright-red hover:bg-selenza-pure-red text-selenza-white font-bold py-3 px-6 rounded-md transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Enviando...' : 'Continuar'}
        </button>
      </div>
      <p className="mt-8 text-sm text-selenza-medium-gray">
        Tu respuesta nos ayuda a mejorar.
      </p>
    </div>
  );
};

export default LandingSurveyPage;