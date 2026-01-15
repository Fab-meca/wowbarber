import { useState } from 'react';
import { User, Phone, Check, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (name: string, phone: string) => void;
  onBack: () => void;
}

const BookingForm = ({ selectedDate, selectedTime, onSubmit, onBack }: BookingFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})/, '($1) ')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .trim();
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    const phoneNumbers = phone.replace(/\D/g, '');
    if (!phoneNumbers) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneNumbers.length < 10) {
      newErrors.phone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name.trim(), phone);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-md mx-auto">
      {/* Booking summary */}
      <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
        <h4 className="font-display text-lg text-gold mb-3">Resumo do Agendamento</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="capitalize">
              {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-gold" />
            <span>{selectedTime}h</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="pl-10 bg-secondary border-border focus:border-gold focus:ring-gold"
              maxLength={100}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Telefone / WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className="pl-10 bg-secondary border-border focus:border-gold focus:ring-gold"
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="goldOutline"
            onClick={onBack}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="gold"
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-1" />
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
