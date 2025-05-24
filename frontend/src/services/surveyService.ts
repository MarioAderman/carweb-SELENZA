// frontend/src/services/surveyService.ts
import apiClient from './apiClient';
import type { SurveySource, SurveyResponsePayload } from '../types/survey.types';

export const getSurveySources = async (): Promise<SurveySource[]> => {
  try {
    const response = await apiClient.get<SurveySource[]>('/survey/sources');
    return response.data;
  } catch (error) {
    console.error('Error fetching survey sources:', error);
    // Consider more robust error handling for the UI
    throw error;
  }
};

export const submitSurveyResponse = async (payload: SurveyResponsePayload): Promise<any> => { // Adjust 'any' to a more specific response type if your backend returns one
  try {
    const response = await apiClient.post('/survey/responses', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting survey response:', error);
    // Consider more robust error handling for the UI
    throw error;
  }
};