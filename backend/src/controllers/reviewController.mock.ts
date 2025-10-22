import { Request, Response } from 'express';
import { mockReviews, mockBookings, mockUsers, findById } from '../data/mockData';
import { AuthRequest } from '../types';

export const createReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { listingId, rating, comment } = req.body;

    // Check if user has booked this listing
    const userBooking = mockBookings.find(
      booking =>
        booking.listingId === listingId &&
        booking.guestId === req.user?.userId &&
        booking.status === 'confirmed' &&
        new Date(booking.checkOut) < new Date()
    );

    if (!userBooking) {
      res.status(403).json({
        error: 'You can only review listings you have stayed at',
      });
      return;
    }

    // Check if user already reviewed this listing
    const existingReview = mockReviews.find(
      review =>
        review.listingId === listingId &&
        review.userId === req.user?.userId
    );

    if (existingReview) {
      res.status(400).json({ error: 'You have already reviewed this listing' });
      return;
    }

    const newReview = {
      _id: `807f1f77bcf86cd79943904${mockReviews.length + 1}`,
      listingId,
      userId: req.user?.userId || '',
      rating,
      comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockReviews.push(newReview);

    res.status(201).json({
      message: 'Review created successfully',
      review: newReview,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getListingReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;

    const listingReviews = mockReviews.filter(
      review => review.listingId === listingId
    );

    // Populate user info
    const reviewsWithUser = listingReviews.map(review => {
      const user = findById(mockUsers, review.userId);
      return {
        ...review,
        userId: user ? {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        } : null,
      };
    });

    res.json({ reviews: reviewsWithUser });
  } catch (error) {
    console.error('Get listing reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const updateReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const reviewIndex = mockReviews.findIndex(r => r._id === id);
    if (reviewIndex === -1) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    const review = mockReviews[reviewIndex];

    // Check if user is the review author
    if (review.userId !== req.user?.userId) {
      res.status(403).json({ error: 'Not authorized to update this review' });
      return;
    }

    mockReviews[reviewIndex] = {
      ...review,
      rating: rating || review.rating,
      comment: comment || review.comment,
      updatedAt: new Date(),
    };

    res.json({
      message: 'Review updated successfully',
      review: mockReviews[reviewIndex],
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export const deleteReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const reviewIndex = mockReviews.findIndex(r => r._id === id);
    if (reviewIndex === -1) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    const review = mockReviews[reviewIndex];

    // Check if user is the review author
    if (review.userId !== req.user?.userId) {
      res.status(403).json({ error: 'Not authorized to delete this review' });
      return;
    }

    mockReviews.splice(reviewIndex, 1);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
