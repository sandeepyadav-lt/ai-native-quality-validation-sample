import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface IAmenity {
  name: string;
  icon?: string;
}

export interface IListing {
  _id: string;
  hostId: string;
  title: string;
  description: string;
  propertyType: 'apartment' | 'house' | 'villa' | 'cabin' | 'cottage' | 'loft' | 'other';
  roomType: 'entire_place' | 'private_room' | 'shared_room';
  location: ILocation;
  price: number;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  rules?: string[];
  checkInTime: string;
  checkOutTime: string;
  minNights: number;
  maxNights: number;
  instantBook: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking {
  _id: string;
  listingId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: string;
  listingId: string;
  userId: string;
  bookingId: string;
  rating: number;
  cleanliness: number;
  communication: number;
  checkIn: number;
  accuracy: number;
  location: number;
  value: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
