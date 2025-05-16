
import React from 'react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth-service';
import { CreditCard, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const user = authService.getCurrentUser();
  
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b bg-gradient-to-r from-blue-900/10 to-blue-700/5 backdrop-blur-sm sticky top-0 z-10 transition-all duration-300">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-md">
          <CreditCard className="h-5 w-5" />
        </div>
        <span className="font-semibold text-lg bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">GhostPay-Lite</span>
        <div className="hidden sm:block bg-muted text-xs px-1.5 py-0.5 rounded">v0.1.0</div>
      </div>
      
      <div className="flex items-center">
        {user && (
          <>
            <span className="hidden sm:block mr-4 text-sm text-muted-foreground">
              Logged in as <span className="font-medium text-foreground">{user.username}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={onLogout} className="spotlight-hover">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
