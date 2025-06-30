import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/common/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import PageLoader from '../components/common/PageLoader';
import { Button } from '../components/ui/button';
import { X, Menu, User } from 'lucide-react';
import { fadeIn, slideFromLeft } from '../utils/animations';

const DashboardLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <motion.div 
        className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 z-30 lg:z-10 w-72 transform ${
          isSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
        } transition-transform duration-300 ease-in-out hidden lg:block`}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DashboardSidebar />
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div 
              className="fixed left-0 top-0 h-full bg-white shadow-xl z-30 w-72 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute right-4 top-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileSidebar}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <DashboardSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        }`}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {/* Mobile header with menu button */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm lg:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Client Dashboard</h1>
            {user && (
              <Button variant="ghost" size="icon" className="flex items-center justify-center">
                <User className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        {/* Desktop header with toggle button */}
        <div className="hidden lg:block sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">Client Dashboard</h1>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
