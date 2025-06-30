import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard,
  CalendarClock,
  Users,
  CheckSquare,
  ShoppingBag,
  ShoppingCart,
  FileText,
  Image,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: t('auth.loggedOut'),
      description: t('auth.loggedOutSuccess'),
    });
  };

  const navItems = [
    { 
      name: t('admin.dashboard'), 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: t('admin.appointments'), 
      path: '/admin/appointments', 
      icon: <CalendarClock className="h-5 w-5" /> 
    },
    { 
      name: t('admin.employees'), 
      path: '/admin/employees', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: t('admin.tasks'), 
      path: '/admin/tasks', 
      icon: <CheckSquare className="h-5 w-5" /> 
    },
    { 
      name: t('admin.products'), 
      path: '/admin/products', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      name: t('admin.orders'), 
      path: '/admin/orders', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: t('admin.blog'), 
      path: '/admin/blog', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: t('admin.portfolio'), 
      path: '/admin/portfolio', 
      icon: <Image className="h-5 w-5" /> 
    },
    { 
      name: t('admin.analytics'), 
      path: '/admin/analytics', 
      icon: <BarChart3 className="h-5 w-5" /> 
    },
    { 
      name: t('admin.settings'), 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop and Mobile */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md z-40 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 lg:w-72
        `}
      >
        <div className="h-full flex flex-col">
          {/* Admin Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              )}
              <div>
                <h3 className="font-medium">{user?.name || 'Admin'}</h3>
                <p className="text-sm text-gray-500">{t('admin.adminPanel')}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive(item.path)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>{t('auth.logout')}</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default AdminSidebar;
