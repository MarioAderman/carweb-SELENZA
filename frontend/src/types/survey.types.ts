// frontend/src/types/survey.types.ts

export interface SurveySource {
    id: number;
    name: string;
  }
  
  export interface SurveyResponsePayload {
    source_id: number;
    details?: string; // Optional, as per your schema
    // session_id will be handled by the backend or a global state/context
  }
  
  export interface SurveySubmission {
    sessionId?: string; // Or however you plan to manage sessions on the frontend
    sourceId: number;
    details?: string;
  }