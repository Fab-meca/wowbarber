import { Scissors, Instagram, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center">
              <Scissors className="w-5 h-5 text-gold" />
            </div>
            <span className="font-display text-2xl">
              <span className="text-foreground">WOW</span>
              <span className="text-gold">BARBER</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/wowbarber"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-carbon transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-carbon transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="mailto:contato@wowbarber.com"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-carbon transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 WowBarber. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
