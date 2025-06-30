import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/common/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import PageLoader from '../components/common/PageLoader';
import { Button } from '../components/ui/button';
import { X, Menu } from 'lucide-react';
import { fadeIn, slideFromLeft } from '../utils/animations';

const AdminLayout = () => {
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
        className={`fixed left-0 top-0 h-full bg-black text-white shadow-xl z-30 lg:z-10 w-72 transform ${
          isSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
        } transition-transform duration-300 ease-in-out hidden lg:block`}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <AdminSidebar />
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
              className="fixed left-0 top-0 h-full bg-black text-white shadow-xl z-30 w-72 lg:hidden"
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
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <AdminSidebar />
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
              className="text-black hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <div className="w-10"></div> {/* Spacer to balance layout */}
          </div>
        </div>

        {/* Desktop header with toggle button */}
        <div className="hidden lg:block sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-black hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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

export default AdminLayout;
