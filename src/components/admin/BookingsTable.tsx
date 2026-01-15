import { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Search, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBookings, Booking } from '@/hooks/useBookings';
import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BookingsTable = () => {
  const { bookings } = useBookings();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'tomorrow' | 'week'>('all');

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Filter by date
    if (filter === 'today') {
      result = result.filter(b => isToday(parseISO(b.date)));
    } else if (filter === 'tomorrow') {
      result = result.filter(b => isTomorrow(parseISO(b.date)));
    } else if (filter === 'week') {
      result = result.filter(b => isThisWeek(parseISO(b.date)));
    }

    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(searchLower) ||
        b.phone.includes(search)
      );
    }

    // Sort by date and time
    result.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

    return result;
  }, [bookings, filter, search]);

  const filterButtons = [
    { key: 'all', label: 'Todos' },
    { key: 'today', label: 'Hoje' },
    { key: 'tomorrow', label: 'Amanhã' },
    { key: 'week', label: 'Esta Semana' },
  ] as const;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-gold" />
          Agendamentos
        </h2>
        <span className="text-sm text-muted-foreground">
          {filteredBookings.length} {filteredBookings.length === 1 ? 'agendamento' : 'agendamentos'}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou telefone..."
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex gap-2">
          {filterButtons.map(btn => (
            <Button
              key={btn.key}
              variant={filter === btn.key ? 'gold' : 'secondary'}
              size="sm"
              onClick={() => setFilter(btn.key)}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horário</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr
                  key={`${booking.date}-${booking.time}-${index}`}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="text-foreground capitalize">
                        {format(parseISO(booking.date), "EEE, d 'de' MMM", { locale: ptBR })}
                      </span>
                      {isToday(parseISO(booking.date)) && (
                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">Hoje</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-foreground font-medium">{booking.time}h</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{booking.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={`https://wa.me/55${booking.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gold hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {booking.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {search || filter !== 'all'
              ? 'Nenhum agendamento encontrado com os filtros aplicados'
              : 'Nenhum agendamento ainda'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
