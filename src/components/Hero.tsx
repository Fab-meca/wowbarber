import { Scissors, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('agendamento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23facc15' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container relative z-10 text-center px-4">
        <div className="animate-fade-in-up">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gold/10 border-2 border-gold animate-pulse-glow">
            <Scissors className="w-10 h-10 text-gold" />
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider mb-4">
            <span className="text-foreground">WOW</span>
            <span className="text-gold">BARBER</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
            Onde estilo encontra precisão. Transforme seu visual com os melhores profissionais da cidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="gold" 
              size="xl"
              onClick={scrollToBooking}
              className="min-w-[200px]"
            >
              Agendar Agora
            </Button>
            <Button 
              variant="goldOutline" 
              size="lg"
              onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Serviços
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-border/50">
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl text-gold">5+</p>
              <p className="text-sm text-muted-foreground">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl text-gold">2000+</p>
              <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl text-gold">4.9</p>
              <p className="text-sm text-muted-foreground">Avaliação Google</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gold/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
