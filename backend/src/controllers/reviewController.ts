import { Response } from 'express';
import Review from '../models/Review';
import Booking from '../models/Booking';
import { AuthRequest } from '../types';

export const createReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      listingId,
      bookingId,
      rating,
      cleanliness,
      communication,
      checkIn,
      accuracy,
      location,
      value,
      comment,
    } = req.body;

    // Check if booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.guestId.toString() !== req.user?.userId) {
      res.status(403).json({ error: 'Not authorized to review this booking' });
      return;
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      res.status(400).json({ error: 'Can only review completed bookings' });
      return;
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      res.status(400).json({ error: 'Review already exists for this booking' });
      return;
    }

    const review = await Review.create({
      listingId,
      userId: req.user?.userId,
      bookingId,
      rating,
      cleanliness,
      communication,
      checkIn,
      accuracy,
      location,
      value,
      comment,
    });

    const populatedReview = await Review.findById(review._id).populate(
      'userId',
      'firstName lastName avatar'
    );

    res.status(201).json({
      message: 'Review created successfully',
      review: populatedReview,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getListingReviews = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;

    const reviews = await Review.find({ listingId })
      .populate('userId', 'firstName lastName avatar')
      .sort({ createdAt: -1 });

    const stats = {
      total: reviews.length,
      average: 0,
      cleanliness: 0,
      communication: 0,
      checkIn: 0,
      accuracy: 0,
      location: 0,
      value: 0,
    };

    if (reviews.length > 0) {
      stats.average =
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      stats.cleanliness =
        reviews.reduce((sum, review) => sum + review.cleanliness, 0) / reviews.length;
      stats.communication =
        reviews.reduce((sum, review) => sum + review.communication, 0) /
        reviews.length;
      stats.checkIn =
        reviews.reduce((sum, review) => sum + review.checkIn, 0) / reviews.length;
      stats.accuracy =
        reviews.reduce((sum, review) => sum + review.accuracy, 0) / reviews.length;
      stats.location =
        reviews.reduce((sum, review) => sum + review.location, 0) / reviews.length;
      stats.value =
        reviews.reduce((sum, review) => sum + review.value, 0) / reviews.length;
    }

    // Round all stats to 1 decimal
    Object.keys(stats).forEach((key) => {
      if (key !== 'total') {
        stats[key as keyof typeof stats] = Math.round(stats[key as keyof typeof stats] * 10) / 10;
      }
    });

    res.json({ reviews, stats });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
