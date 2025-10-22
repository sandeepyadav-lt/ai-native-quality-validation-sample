import express from 'express';
import { createReview, getListingReviews } from '../controllers/reviewController.mock'; // Using mock data
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createReview);
router.get('/listing/:listingId', getListingReviews);

export default router;
