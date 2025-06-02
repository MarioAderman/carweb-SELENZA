import { Router } from 'express';
import {
  getVehicleImages,
  addImageToVehicle,
  deleteImage
} from '../controllers/images.controller';
import { uploadVehicleImages } from '../middleware/upload';

const router = Router();

router.get('/:vehicleId', getVehicleImages);
router.post('/:vehicleId/:model', uploadVehicleImages, addImageToVehicle);
router.delete('/:imageId', deleteImage);

export default router;
