// frontend/src/contexts/SurveyContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SurveyContextType {
  hasCompletedSurvey: boolean;
  setHasCompletedSurvey: (completed: boolean) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasCompletedSurvey, setHasCompletedSurveyState] = useState<boolean>(() => {
    // Check local storage on initial load
    return localStorage.getItem('selenzaSurveyCompleted') === 'true';
  });

  const setHasCompletedSurvey = (completed: boolean) => {
    setHasCompletedSurveyState(completed);
    if (completed) {
      localStorage.setItem('selenzaSurveyCompleted', 'true');
    } else {
      localStorage.removeItem('selenzaSurveyCompleted'); // For potential reset
    }
    localStorage.setItem('selenzaSurveyCompleted', 'true');
  };

  return (
    <SurveyContext.Provider value={{ hasCompletedSurvey, setHasCompletedSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveyContext must be used within a SurveyProvider');
  }
  return context;
};