// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  isHost: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Location Types
export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Listing Types
export interface Listing {
  _id: string;
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    createdAt?: string;
  } | string;
  title: string;
  description: string;
  propertyType: string;
  location: Location;
  price: number;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating?: number;
  reviewCount?: number;
  isAvailable?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export interface Booking {
  _id: string;
  listingId: Listing | string;
  guestId: User | string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  _id: string;
  listingId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// Search and Filter Types
export interface SearchFilters {
  city?: string;
  country?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  checkIn?: Date;
  checkOut?: Date;
}

// Pagination Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListingsResponse {
  listings: Listing[];
  pagination: PaginationMeta;
}

// Export all types
export type {
  User as UserType,
  AuthResponse as AuthResponseType,
  Location as LocationType,
  Listing as ListingType,
  Booking as BookingType,
  Review as ReviewType,
  SearchFilters as SearchFiltersType,
  PaginationMeta as PaginationMetaType,
  ListingsResponse as ListingsResponseType,
};
