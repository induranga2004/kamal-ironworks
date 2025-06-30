import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Common components
import PageLoader from './components/common/PageLoader';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AppointmentBooking = lazy(() => import('./pages/AppointmentBooking'));
const QuotationRequest = lazy(() => import('./pages/QuotationRequest'));

// User dashboard pages
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const MyAppointments = lazy(() => import('./pages/dashboard/MyAppointments'));
const Quotations = lazy(() => import('./pages/dashboard/Quotations'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Orders = lazy(() => import('./pages/dashboard/Orders'));
const Messages = lazy(() => import('./pages/dashboard/Messages'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminEmployees = lazy(() => import('./pages/admin/AdminEmployees'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminQuotations = lazy(() => import('./pages/admin/AdminQuotations'));
const AdminTasks = lazy(() => import('./pages/admin/AdminTasks'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminBlogPosts = lazy(() => import('./pages/admin/AdminBlogPosts'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));

function App() {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shop" element={<Shop />} />
              <Route path="appointments" element={<AppointmentBooking />} />
              <Route path="quotations" element={<QuotationRequest />} />
              <Route path="cart" element={<Cart />} />
              
              {/* Auth pages */}
              <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
              <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              
              {/* Checkout (requires auth) */}
              <Route 
                path="checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* User Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="appointments" element={<MyAppointments />} />
              <Route path="quotations" element={<Quotations />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="employees" element={<AdminEmployees />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="quotations" element={<AdminQuotations />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="blog" element={<AdminBlogPosts />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      
      {/* Toast container for notifications */}
      <Toaster />
    </>
  );
}

export default App;
