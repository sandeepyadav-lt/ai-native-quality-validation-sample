import api from './api';
import type { Booking } from '../types';

interface CreateBookingData {
  listingId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export const bookingService = {
  async createBooking(data: CreateBookingData): Promise<{ booking: Booking }> {
    const response = await api.post<{ booking: Booking }>('/bookings', data);
    return response.data;
  },

  async getUserBookings(): Promise<{ bookings: Booking[] }> {
    const response = await api.get<{ bookings: Booking[] }>('/bookings/user');
    return response.data;
  },

  async getHostBookings(): Promise<{ bookings: Booking[] }> {
    const response = await api.get<{ bookings: Booking[] }>('/bookings/host');
    return response.data;
  },

  async getBookingById(id: string): Promise<{ booking: Booking }> {
    const response = await api.get<{ booking: Booking }>(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id: string): Promise<{ booking: Booking }> {
    const response = await api.put<{ booking: Booking }>(`/bookings/${id}/cancel`);
    return response.data;
  },
};
