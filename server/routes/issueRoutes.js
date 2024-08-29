import express from 'express';
import {
  registerIssue,
  getOne,
  getAll,
} from '../controllers/issueController.js';

const router = express.Router();

router.post('/', registerIssue);
router.get('/:id', getOne);
router.get('/', getAll);

export default router;
