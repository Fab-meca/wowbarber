import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import BookingsTable from '@/components/admin/BookingsTable';
import SlotManager from '@/components/admin/SlotManager';
import ServicesEditor from '@/components/admin/ServicesEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Scissors } from 'lucide-react';

const Admin = () => {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-gold">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={logout} />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-2">
            Painel <span className="text-gold">Administrativo</span>
          </h1>
          <p className="text-muted-foreground">
            Gerencie agendamentos, horários e serviços da WowBarber
          </p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger 
              value="bookings" 
              className="data-[state=active]:bg-gold data-[state=active]:text-carbon flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger 
              value="slots"
              className="data-[state=active]:bg-gold data-[state=active]:text-carbon flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Horários
            </TabsTrigger>
            <TabsTrigger 
              value="services"
              className="data-[state=active]:bg-gold data-[state=active]:text-carbon flex items-center gap-2"
            >
              <Scissors className="w-4 h-4" />
              Serviços
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <BookingsTable />
          </TabsContent>

          <TabsContent value="slots" className="mt-6">
            <SlotManager />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
