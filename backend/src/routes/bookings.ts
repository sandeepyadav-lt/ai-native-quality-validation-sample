import express from 'express';
import {
  createBooking,
  getUserBookings,
  getHostBookings,
  cancelBooking,
} from '../controllers/bookingController.mock'; // Using mock data
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/user', authenticate, getUserBookings);
router.get('/host', authenticate, getHostBookings);
router.put('/:id/cancel', authenticate, cancelBooking);

export default router;
