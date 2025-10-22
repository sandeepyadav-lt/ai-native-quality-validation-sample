import express from 'express';
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getAvailability,
} from '../controllers/listingController.mock'; // Using mock data
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.get('/:id/availability', getAvailability);
router.post('/', authenticate, createListing);
router.put('/:id', authenticate, updateListing);
router.delete('/:id', authenticate, deleteListing);

export default router;
