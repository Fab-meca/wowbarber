import { useState, useEffect, useCallback } from 'react';

export interface Booking {
  date: string;
  time: string;
  name: string;
  phone: string;
  createdAt: string;
}

const STORAGE_KEY = 'wowbarber_bookings';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading bookings:', e);
        setBookings([]);
      }
    }
  }, []);

  const saveBooking = useCallback((booking: Omit<Booking, 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      createdAt: new Date().toISOString(),
    };
    
    setBookings(prev => {
      const updated = [...prev, newBooking];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    
    return newBooking;
  }, []);

  const isSlotBooked = useCallback((date: string, time: string): boolean => {
    return bookings.some(b => b.date === date && b.time === time);
  }, [bookings]);

  const getBookedSlots = useCallback((date: string): string[] => {
    return bookings
      .filter(b => b.date === date)
      .map(b => b.time);
  }, [bookings]);

  return {
    bookings,
    saveBooking,
    isSlotBooked,
    getBookedSlots,
  };
};
