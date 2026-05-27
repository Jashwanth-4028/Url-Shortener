import express from 'express';
import {
  createUrl,
  getMyUrls,
  updateUrl,
  deleteUrl,
  getPublicStats,
} from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateCreateUrl, validateUpdateUrl } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/create', protect, validateCreateUrl, createUrl);
router.get('/myurls', protect, getMyUrls);
router.put('/:id', protect, validateUpdateUrl, updateUrl);
router.delete('/:id', protect, deleteUrl);
router.get('/public/:shortCode', getPublicStats);

export default router;
