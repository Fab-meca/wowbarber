import { Scissors, User, Sparkles, Eye, LucideIcon } from 'lucide-react';
import { useServices } from '@/hooks/useServices';

const iconMap: Record<string, LucideIcon> = {
  'Corte Masculino': Scissors,
  'Barba Completa': User,
  'Combo Premium': Sparkles,
  'Sobrancelha': Eye,
};

const Services = () => {
  const { services } = useServices();

  const getIcon = (name: string): LucideIcon => {
    return iconMap[name] || Scissors;
  };

  return (
    <section id="servicos" className="py-20 md:py-32">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            NOSSOS <span className="text-gold">SERVIÇOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Serviços premium com os melhores produtos e técnicas do mercado
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = getIcon(service.name);
            
            return (
              <div
                key={service.id}
                className={`group relative p-6 rounded-xl border transition-all duration-500 hover:scale-105 ${
                  service.featured
                    ? 'bg-gold/10 border-gold shadow-[0_0_30px_hsl(48_96%_53%/0.2)]'
                    : 'bg-card border-border hover:border-gold/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-carbon text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Mais Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  service.featured ? 'bg-gold' : 'bg-gold/10 group-hover:bg-gold/20'
                }`}>
                  <Icon className={`w-7 h-7 ${service.featured ? 'text-carbon' : 'text-gold'}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">{service.description}</p>

                {/* Price and duration */}
                <div className="flex items-end justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="font-display text-3xl text-gold">{service.price}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
