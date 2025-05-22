import { Router } from 'express';
import {
  getVehicleImages,
  addImageToVehicle,
  deleteImage
} from '../controllers/images.controller';

const router = Router();

router.get('/:vehicleId', getVehicleImages);
router.post('/:vehicleId', addImageToVehicle);
router.delete('/:imageId', deleteImage);

export default router;
