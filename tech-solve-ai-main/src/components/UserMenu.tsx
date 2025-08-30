import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  UserCircle
} from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="outline" size="sm" className="rounded-full">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-secondary">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <UserCircle className="w-4 h-4" />
        <span className="text-sm font-medium">
          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Signed in as
            </div>
            <div className="font-medium text-gray-900 dark:text-white truncate">
              {user.email}
            </div>
            {user.user_metadata?.full_name && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {user.user_metadata.full_name}
              </div>
            )}
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <Link 
              to="/settings" 
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
            
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
