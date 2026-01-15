import { useState, useEffect, useCallback } from 'react';

export interface BlockedSlot {
  date: string;
  time: string;
  reason?: string;
}

const STORAGE_KEY = 'wowbarber_blocked_slots';

export const useBlockedSlots = () => {
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBlockedSlots(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading blocked slots:', e);
        setBlockedSlots([]);
      }
    }
  }, []);

  const blockSlot = useCallback((date: string, time: string, reason?: string) => {
    setBlockedSlots(prev => {
      const exists = prev.some(s => s.date === date && s.time === time);
      if (exists) return prev;
      
      const updated = [...prev, { date, time, reason }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const unblockSlot = useCallback((date: string, time: string) => {
    setBlockedSlots(prev => {
      const updated = prev.filter(s => !(s.date === date && s.time === time));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isSlotBlocked = useCallback((date: string, time: string): boolean => {
    return blockedSlots.some(s => s.date === date && s.time === time);
  }, [blockedSlots]);

  const getBlockedSlotsForDate = useCallback((date: string): string[] => {
    return blockedSlots.filter(s => s.date === date).map(s => s.time);
  }, [blockedSlots]);

  return {
    blockedSlots,
    blockSlot,
    unblockSlot,
    isSlotBlocked,
    getBlockedSlotsForDate,
  };
};
