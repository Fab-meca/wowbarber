import { useState } from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';
import { useBookings } from '@/hooks/useBookings';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Step = 'calendar' | 'form' | 'success';

const BookingSection = () => {
  const [step, setStep] = useState<Step>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    date: string;
    time: string;
  } | null>(null);

  const { saveBooking, getBookedSlots } = useBookings();

  const bookedSlots = selectedDate
    ? getBookedSlots(format(selectedDate, 'yyyy-MM-dd'))
    : [];

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleSubmitForm = (name: string, phone: string) => {
    if (!selectedDate || !selectedTime) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    saveBooking({
      date: dateStr,
      time: selectedTime,
      name,
      phone,
    });

    setBookingDetails({
      name,
      date: format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }),
      time: selectedTime,
    });

    setStep('success');
  };

  const handleNewBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingDetails(null);
    setStep('calendar');
  };

  return (
    <section id="agendamento" className="py-20 md:py-32">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            AGENDE SEU <span className="text-gold">HORÁRIO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Escolha o melhor dia e horário para você. Atendimento de segunda a sexta.
          </p>
        </div>

        {/* Booking steps */}
        {step === 'calendar' && (
          <BookingCalendar
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            selectedTime={selectedTime}
            onSelectTime={handleSelectTime}
            bookedSlots={bookedSlots}
          />
        )}

        {step === 'form' && selectedDate && selectedTime && (
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleSubmitForm}
            onBack={() => setStep('calendar')}
          />
        )}

        {step === 'success' && bookingDetails && (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-card border border-gold rounded-xl p-8 md:p-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center animate-pulse-glow">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>
              
              <h3 className="font-display text-2xl text-foreground mb-2">
                Agendamento Confirmado!
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Obrigado, <span className="text-gold font-medium">{bookingDetails.name}</span>!
              </p>

              <div className="bg-secondary rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Data e Horário</p>
                    <p className="capitalize">{bookingDetails.date}</p>
                    <p className="text-gold font-bold">{bookingDetails.time}h</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Aguardamos você! Qualquer dúvida, entre em contato pelo WhatsApp.
              </p>

              <Button variant="gold" onClick={handleNewBooking} className="w-full">
                Fazer Novo Agendamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
