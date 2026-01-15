import { useState, useEffect, useCallback } from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  featured?: boolean;
}

const STORAGE_KEY = 'wowbarber_services';

const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte moderno ou clássico com acabamento perfeito',
    price: 'R$ 45',
    duration: '45 min',
  },
  {
    id: '2',
    name: 'Barba Completa',
    description: 'Design, aparar e hidratação com toalha quente',
    price: 'R$ 35',
    duration: '30 min',
  },
  {
    id: '3',
    name: 'Combo Premium',
    description: 'Corte + Barba + Hidratação facial completa',
    price: 'R$ 70',
    duration: '1h 15min',
    featured: true,
  },
  {
    id: '4',
    name: 'Sobrancelha',
    description: 'Design e alinhamento profissional',
    price: 'R$ 20',
    duration: '15 min',
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setServices(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading services:', e);
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
    }
  }, []);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addService = useCallback((service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
    };
    setServices(prev => {
      const updated = [...prev, newService];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    setServices(defaultServices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
  }, []);

  return {
    services,
    updateService,
    addService,
    deleteService,
    resetToDefault,
  };
};
