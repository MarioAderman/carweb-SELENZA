import { Request } from 'express';

export interface UploadRequest extends Request {
  params: {
    model: string;
    vehicleId: string;
  };
}
