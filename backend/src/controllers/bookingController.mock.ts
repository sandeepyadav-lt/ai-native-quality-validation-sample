import { Request, Response } from 'express';
import { mockBookings, mockListings, findById } from '../data/mockData';
import { AuthRequest } from '../types';

export const createBooking = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    const listing = findById(mockListings, listingId);
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    // Check availability
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const conflictingBookings = mockBookings.filter(booking => {
      if (booking.listingId !== listingId) return false;
      if (!['confirmed', 'pending'].includes(booking.status)) return false;

      const bookingCheckIn = new Date(booking.checkIn);
      const bookingCheckOut = new Date(booking.checkOut);

      return (
        (bookingCheckIn >= start && bookingCheckIn <= end) ||
        (bookingCheckOut >= start && bookingCheckOut <= end) ||
        (bookingCheckIn <= start && bookingCheckOut >= end)
      );
    });

    if (conflictingBookings.length > 0) {
      res.status(400).json({ error: 'Listing not available for selected dates' });
      return;
    }

    // Calculate total price
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const newBooking = {
      _id: `707f1f77bcf86cd79943903${mockBookings.length + 1}`,
      listingId,
      guestId: req.user?.userId || '',
      hostId: listing.hostId,
      checkIn: start,
      checkOut: end,
      guests,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockBookings.push(newBooking);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getUserBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userBookings = mockBookings.filter(
      booking => booking.guestId === req.user?.userId
    );

    // Populate listing info
    const bookingsWithDetails = userBookings.map(booking => {
      const listing = findById(mockListings, booking.listingId);
      return {
        ...booking,
        listing: listing ? {
          _id: listing._id,
          title: listing.title,
          images: listing.images,
          location: listing.location,
          price: listing.price,
        } : null,
      };
    });

    res.json({ bookings: bookingsWithDetails });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getHostBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const hostBookings = mockBookings.filter(
      booking => booking.hostId === req.user?.userId
    );

    // Populate listing info
    const bookingsWithDetails = hostBookings.map(booking => {
      const listing = findById(mockListings, booking.listingId);
      return {
        ...booking,
        listing: listing ? {
          _id: listing._id,
          title: listing.title,
          images: listing.images,
          location: listing.location,
          price: listing.price,
        } : null,
      };
    });

    res.json({ bookings: bookingsWithDetails });
  } catch (error) {
    console.error('Get host bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const cancelBooking = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const bookingIndex = mockBookings.findIndex(b => b._id === id);
    if (bookingIndex === -1) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    const booking = mockBookings[bookingIndex];

    // Check if user is the guest or host
    if (
      booking.guestId !== req.user?.userId &&
      booking.hostId !== req.user?.userId
    ) {
      res.status(403).json({ error: 'Not authorized to cancel this booking' });
      return;
    }

    mockBookings[bookingIndex] = {
      ...booking,
      status: 'cancelled',
      updatedAt: new Date(),
    };

    res.json({
      message: 'Booking cancelled successfully',
      booking: mockBookings[bookingIndex],
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};
