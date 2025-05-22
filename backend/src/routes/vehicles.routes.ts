import { Router } from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicles.controller';

const router = Router();

router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
