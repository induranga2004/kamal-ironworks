import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { pageTransition } from '../utils/animations';

const MainLayout = ({ title, description, noIndex = false }) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const defaultTitle = t('site.title') || 'Kamal Iron Works';
  const defaultDescription = t('site.description') || 'Premier steel fabrication and metal works in Sri Lanka';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        {noIndex && <meta name="robots" content="noindex" />}
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <motion.main 
          className="flex-grow"
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Outlet />
        </motion.main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default MainLayout;
