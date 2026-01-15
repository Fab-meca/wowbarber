import { MapPin, Phone, Clock, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const whatsappNumber = '5511999999999';
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da WowBarber.');

  return (
    <section id="contato" className="py-20 md:py-32 bg-carbon-light">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            ONDE <span className="text-gold">ESTAMOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Venha nos visitar e experimente o melhor atendimento da cidade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="bg-card border border-border rounded-xl overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975943697567!2d-46.65512702466088!3d-23.561684478808994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1705000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização WowBarber"
            />
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-lg text-foreground mb-1">Endereço</h4>
                <p className="text-muted-foreground">
                  Av. Paulista, 1000 - Sala 502<br />
                  Bela Vista, São Paulo - SP<br />
                  CEP: 01310-100
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-lg text-foreground mb-1">Horário de Funcionamento</h4>
                <p className="text-muted-foreground">
                  Segunda a Sexta: 08:00 - 19:00<br />
                  <span className="text-muted-foreground/60">Sábado e Domingo: Fechado</span>
                </p>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="gold" className="w-full h-14">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </a>

              <a
                href="https://instagram.com/wowbarber"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="goldOutline" className="w-full h-14">
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:+5511999999999"
              className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:border-gold/50 transition-colors block"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-lg text-foreground mb-1">Telefone</h4>
                <p className="text-gold font-medium">(11) 99999-9999</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
