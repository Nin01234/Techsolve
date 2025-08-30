import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { 
  Menu, 
  X, 
  Cpu, 
  Bot, 
  BookOpen, 
  Search, 
  Users, 
  Video,
  Stethoscope,
  User,
  LogOut,
  MessageSquare,
  Settings
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Cpu },
  { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
  { name: 'AI Assistant', path: '/chat', icon: Bot },
  { name: 'Diagnostics', path: '/diagnostics', icon: Stethoscope },
  { name: 'Video Library', path: '/videos', icon: Video },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Contact', path: '/contact', icon: MessageSquare },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">TechSolve</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="rounded-full">
              <Search className="w-4 h-4" />
            </Button>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'hover:bg-muted text-foreground/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="pt-4 mt-4 border-t border-border/20">
              <div className="px-4 py-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};