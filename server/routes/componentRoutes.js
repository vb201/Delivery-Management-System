import express from 'express';
import {
  registerComponent,
  getOneComponent,
  getAllComponents,
} from '../controllers/componentController.js';

const router = express.Router();

router.get('/', getAllComponents);
router.get('/:id', getOneComponent);
router.post('/', registerComponent);

export default router;
