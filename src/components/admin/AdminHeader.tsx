import { Scissors, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold flex items-center justify-center">
              <Scissors className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="font-display text-xl">
                <span className="text-foreground">WOW</span>
                <span className="text-gold">BARBER</span>
              </span>
              <span className="text-xs text-muted-foreground ml-2">Admin</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold">
                <Home className="w-4 h-4 mr-2" />
                Ver Site
              </Button>
            </Link>
            <Button
              variant="goldOutline"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
