import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWeekend, isBefore, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  bookedSlots: string[];
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const BookingCalendar = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  bookedSlots,
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || isBefore(date, today);
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Calendar */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-gold hover:text-gold hover:bg-gold/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="font-display text-xl text-foreground capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-gold hover:text-gold hover:bg-gold/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first day of month */}
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const disabled = isDateDisabled(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !disabled && onSelectDate(day)}
                disabled={disabled}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${!isCurrentMonth ? 'text-muted-foreground/30' : ''}
                  ${disabled ? 'text-muted-foreground/30 cursor-not-allowed' : 'hover:bg-gold/20 cursor-pointer'}
                  ${isSelected ? 'bg-gold text-carbon font-bold' : ''}
                  ${isToday && !isSelected ? 'border border-gold text-gold' : ''}
                  ${!disabled && !isSelected ? 'text-foreground' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Atendimento de Segunda a Sexta
        </p>
      </div>

      {/* Time slots */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gold" />
          Horários Disponíveis
        </h3>

        {selectedDate ? (
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  onClick={() => !isBooked && onSelectTime(time)}
                  disabled={isBooked}
                  className={`
                    py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${isBooked 
                      ? 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed line-through' 
                      : isSelected
                        ? 'bg-gold text-carbon font-bold'
                        : 'bg-secondary text-foreground hover:bg-gold/20 hover:text-gold'
                    }
                  `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p className="text-center">
              Selecione uma data no calendário para ver os horários disponíveis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
