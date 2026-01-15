import { useState, useMemo } from 'react';
import { Clock, Lock, Unlock, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBlockedSlots } from '@/hooks/useBlockedSlots';
import { useBookings } from '@/hooks/useBookings';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isWeekend, isBefore, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const SlotManager = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const { blockedSlots, blockSlot, unblockSlot, isSlotBlocked } = useBlockedSlots();
  const { isSlotBooked } = useBookings();
  const today = startOfToday();

  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => addDays(currentWeek, i));
  }, [currentWeek]);

  const handleSlotClick = (date: Date, time: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    if (isSlotBooked(dateStr, time)) return;
    
    if (isSlotBlocked(dateStr, time)) {
      unblockSlot(dateStr, time);
    } else {
      blockSlot(dateStr, time, 'Bloqueado pelo admin');
    }
  };

  const getSlotStatus = (date: Date, time: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isPast = isBefore(date, today);
    
    if (isPast) return 'past';
    if (isSlotBooked(dateStr, time)) return 'booked';
    if (isSlotBlocked(dateStr, time)) return 'blocked';
    return 'available';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
          <Clock className="w-6 h-6 text-gold" />
          Gerenciar Horários
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
            className="text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-foreground min-w-[200px] text-center">
            {format(weekDays[0], "d 'de' MMM", { locale: ptBR })} - {format(weekDays[4], "d 'de' MMM", { locale: ptBR })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            className="text-muted-foreground hover:text-gold"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary" />
          <span className="text-muted-foreground">Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gold" />
          <span className="text-muted-foreground">Agendado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/50" />
          <span className="text-muted-foreground">Bloqueado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted/30" />
          <span className="text-muted-foreground">Passado</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground w-20">
                Horário
              </th>
              {weekDays.map(day => (
                <th key={day.toISOString()} className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                  <div className="flex flex-col items-center gap-1">
                    <span className="capitalize">{format(day, 'EEE', { locale: ptBR })}</span>
                    <span className="text-foreground font-display text-lg">{format(day, 'd')}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time} className="border-t border-border/30">
                <td className="py-2 px-2 text-sm text-foreground font-medium">
                  {time}
                </td>
                {weekDays.map(day => {
                  const status = getSlotStatus(day, time);
                  const dateStr = format(day, 'yyyy-MM-dd');
                  
                  return (
                    <td key={`${dateStr}-${time}`} className="py-2 px-2">
                      <button
                        onClick={() => handleSlotClick(day, time)}
                        disabled={status === 'booked' || status === 'past'}
                        className={`
                          w-full h-10 rounded-lg flex items-center justify-center transition-all
                          ${status === 'available' ? 'bg-secondary hover:bg-gold/20 cursor-pointer' : ''}
                          ${status === 'booked' ? 'bg-gold cursor-not-allowed' : ''}
                          ${status === 'blocked' ? 'bg-destructive/50 hover:bg-destructive/70 cursor-pointer' : ''}
                          ${status === 'past' ? 'bg-muted/30 cursor-not-allowed' : ''}
                        `}
                        title={
                          status === 'booked' ? 'Horário agendado' :
                          status === 'blocked' ? 'Clique para desbloquear' :
                          status === 'past' ? 'Horário passado' :
                          'Clique para bloquear'
                        }
                      >
                        {status === 'blocked' && <Lock className="w-4 h-4 text-foreground/70" />}
                        {status === 'booked' && <Calendar className="w-4 h-4 text-carbon" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        💡 Clique em um horário para bloquear/desbloquear. Horários agendados não podem ser alterados.
      </p>
    </div>
  );
};

export default SlotManager;
