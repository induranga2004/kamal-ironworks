import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { navUnderline, fadeIn, slideFromTop } from '../../utils/animations';

// Import logo from assets folder
import logoWhite from '../../../images/kamal logo black and white.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'si' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const navItems = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.about'), path: '/about' },
    { name: t('navigation.services'), path: '/services' },
    { name: t('navigation.portfolio', 'Portfolio'), path: '/portfolio' },
    { name: t('navigation.products'), path: '/shop' },
    { name: t('navigation.blog'), path: '/blog' },
    { name: t('navigation.contact'), path: '/contact' },
  ];

  const headerClasses = scrolled 
    ? "bg-black text-white shadow-md py-2" 
    : "bg-black text-white py-4";

  return (
    <motion.header 
      className={`${headerClasses} sticky top-0 z-40 w-full transition-all duration-300`}
      initial="initial"
      animate="animate"
      variants={slideFromTop}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.img 
            src={logoWhite}
            alt="Kamal Iron Works" 
            className="h-10 md:h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.path} className="relative overflow-hidden">
              <Link 
                to={item.path}
                className="font-medium text-gray-100 hover:text-white transition-colors"
              >
                <motion.div 
                  className="relative"
                  initial="initial"
                  whileHover="whileHover"
                  animate="animate"
                >
                  {item.name}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                    variants={navUnderline}
                  />
                </motion.div>
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleLanguage}
            className="text-white flex items-center gap-1"
          >
            <Globe className="h-4 w-4" />
            <span>{i18n.language === 'en' ? 'EN' : 'සිං'}</span>
          </Button>
          
          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(user.isAdmin ? '/admin' : '/dashboard')}
                className="flex items-center gap-2 border-white text-white hover:bg-primary"
              >                <User className="h-4 w-4" />
                <span>{user.isAdmin ? t('navigation.admin') : t('navigation.dashboard')}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"                onClick={handleLogout}
                className="text-white hover:text-white hover:bg-primary/20"
              >
                {t('auth.logout')}
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"                onClick={() => navigate('/login')}
                className="text-white hover:text-white hover:bg-primary/20"
              >
                {t('auth.login')}
              </Button>
              <Button
                variant="accent"
                size="sm"                onClick={() => navigate('/register')}
              >
                {t('auth.register')}
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="text-white hover:text-white hover:bg-primary/20"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-white hover:text-white hover:bg-primary/20"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-black border-t border-gray-800"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={{
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.path}
                      className="block py-2 text-gray-100 hover:text-white border-b border-gray-800"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={toggleLanguage}
                    className="justify-start text-white hover:text-white hover:bg-primary/20"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{i18n.language === 'en' ? 'English' : 'සිංහල'}</span>
                  </Button>
                  
                  {user ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate(user.isAdmin ? '/admin' : '/dashboard');
                          toggleMenu();
                        }}
                        className="justify-start text-white hover:text-white hover:bg-primary/20"
                      >                        <User className="h-4 w-4 mr-2" />
                        <span>{user.isAdmin ? t('navigation.admin') : t('navigation.dashboard')}</span>
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => {                handleLogout();
                          toggleMenu();
                        }}
                      >
                        {t('auth.logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate('/login');
                          toggleMenu();
                        }}                        className="justify-start text-white hover:text-white hover:bg-primary/20"
                      >
                        {t('auth.login')}
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => {
                          navigate('/register');                          toggleMenu();
                        }}
                      >
                        {t('auth.register')}
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
