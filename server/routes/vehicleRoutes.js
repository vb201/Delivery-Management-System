import express from 'express';
import {
  registerVehicle,
  getOneVehicle,
  getAllVehicles,
} from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/', registerVehicle);
router.get('/:id', getOneVehicle);
router.get('/', getAllVehicles);

export default router;
